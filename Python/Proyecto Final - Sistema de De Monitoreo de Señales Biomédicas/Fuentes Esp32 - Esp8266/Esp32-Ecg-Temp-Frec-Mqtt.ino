#include <PubSubClient.h>
#include <WiFi.h>
//#include <ESP8266WiFi.h>

const int lo_mas=17;
const int lo_menos=16;
const char* ssid="Fibertel WiFi793 2.4GHz";
const char* password="00416443955";

char* topic= "esp_1/pote1";
//Cambiar Segun direccion ip del servidor(Establecer IP FIJA EN EL SERVIDOR)!!!
const char* broker="192.168.0.185";

///////////////////////////////////////////////////////
//Variables FC Stimation

//contar los pulsos que realiza cada segundo
int contador_pulso=0;
bool d_almacenado=0; //auxiliar para contar el pico
int PPM=0;
//variables cada tiempo entre pulsos
float tiempo_ant=0;
float tiempo_act=0;
float tpp=1;
//variables para tomar muestras por segundo
int segant=0;
int seg=0;
//variable para realizar operaciones
bool operaciones=0;


///////////////////////////////////////////////////


WiFiClient cliente_wifi;
PubSubClient esp_1(cliente_wifi);

unsigned long ultimo_msj=0;
unsigned long now;
unsigned long temp_frec; 
unsigned long refresh_temp=0;
char msj[121];
char test_msj[5];
String buffer_valor_ecg="",buffer_msj="",buffer_valor_temp="",buffer_valor_fc="";
unsigned int valor_ecg=0;
unsigned int valor_ecg_filter = 0;
unsigned int valor_temp=0;

//Frecuency 
unsigned int primer_valor_ecg=0;
unsigned int primer_valor_ecg_filter= 0;

byte i=0;
byte cifras_ecg=1;
byte cifras_temp=1;
byte cifras_fc=1;

unsigned int comprobar_ecg;
unsigned int  comprobar_temp;
unsigned int  comprobar_fc;

void config_wifi()

{
  Serial.println();
  Serial.print("Conectando a");
  Serial.println(ssid);

  WiFi.begin(ssid,password);

  while (WiFi.status()!=WL_CONNECTED){
    delay(500);
    Serial.print(".");
    
    
    }
  

randomSeed(micros());

Serial.println("");
Serial.println("WiFi conectado");
Serial.println("Direccion ip: ");
Serial.println(WiFi.localIP());
}
  

  void callback(char* topic, byte* payload, unsigned int length)
  {
    Serial.print("Mensaje recibido[");
    Serial.print(topic);
    Serial.print("] ");
    for (int i =0; i<length;i++)
    {
      Serial.print((char)payload[i]);
      
      }

     Serial.println();

     if((char)payload[0]=='1')
     {
      digitalWrite(27,LOW); //Prendemos el led cuando recibimos el mensaje
      
      }else
      {
        digitalWrite(27,HIGH);
        }
          
    
    }
  
void reconnect()

  {
    
    while(!esp_1.connected())
    {
      Serial.println("Intentando realizar conexion con el servidor  MQTT");
      String Id_cliente="ESP32";
      //Id_cliente+=String(random(0xffff),HEX);

      if(esp_1.connect(Id_cliente.c_str()))
      {
        Serial.println("Conectado");
        //esp_1.publish(topic,"hello world");
        //esp_1.subscribe(topic);
        
        }else
        {Serial.println("failed,rc=");
        Serial.println(esp_1.state());
        Serial.println("Se realizara un nuevo intento en 5 segundos");
         delay(5000); 
          
          }
        
      
      }
    
    
    
    }


void setup() {

  pinMode(27,OUTPUT);
  pinMode(lo_mas,INPUT);
  pinMode(lo_menos,INPUT);
  Serial.begin(115200);
  config_wifi();
  esp_1.setServer(broker,1883);
  esp_1.setCallback(callback);

}




//////////////////////////////////////////////////
//BandPass Filter

float EMA_ALPHA_LOW = 0;
float EMA_ALPHA_HIGH = 0.75;
float EMA_LP_LOW = 0;
float EMA_LP_HIGH = 0;
float EMA_BP = 0;


float EMABandPassFilter(float value)
{
  EMA_LP_LOW = EMA_ALPHA_LOW * value + (1 - EMA_ALPHA_LOW) * EMA_LP_LOW;
  EMA_LP_HIGH = EMA_ALPHA_HIGH * value + (1 - EMA_ALPHA_HIGH) * EMA_LP_HIGH;
  EMA_BP = EMA_LP_HIGH - EMA_LP_LOW;
  return EMA_BP;
}

/////////////////////////////////////////////////

void loop() {

  if(!esp_1.connected()){
    
    reconnect();
    
    }
esp_1.loop();

 //esp_1.publish(topic,"hola");
 //delay(1000);

now=millis();

if (now-ultimo_msj>10)
{

  ultimo_msj=now;

if ((digitalRead(lo_mas)==1)||(digitalRead(lo_menos)==1)){
    
    
    }else{ //aca es donde realizo el buffer

      i+=1;
      primer_valor_ecg = analogRead(A0);
      delay(1);
      valor_ecg=analogRead(A0);

      primer_valor_ecg_filter = (int)EMABandPassFilter(valor_ecg);
      valor_ecg_filter = (int)EMABandPassFilter(valor_ecg);

      //////////////////////////////////////////////////////////


       segant=seg;// segundo anterior es igual segundo actual
       seg=millis () / 1000;// se actualiza el dato al estado actual
        
       if (segant != seg) {// si los datos son diferentes (paso un segundo) se activa la variable
          
          PPM=60 /(tpp /1000);
          Serial.println (PPM); //imprime los pulsos por minutos
          contador_pulso=0;
          // delay (10); 
          
          if (PPM > 100){
            Serial.println ("ARRITMIA TAQUICARDIA");
            } 
    
            else if (PPM<=100 && PPM> 60){
            Serial.println ("NORMAL");
            }
            
            else{
              Serial.println ("ARRITMIA BRADICARDIA");
              }

          /////Mqtt - Publish
          
           comprobar_fc=PPM;
    
          while (comprobar_fc/10>0)
          {
            comprobar_fc=comprobar_fc/10; //saco la cantidad de cifras que tiene el dato
            cifras_fc+=1;
            }
          
          buffer_valor_fc =String(PPM); //armo los paquetes de 4 bytes
          
          if (cifras_fc==1) buffer_valor_fc="000" + buffer_valor_fc;
          if (cifras_fc==2) buffer_valor_fc="00" + buffer_valor_fc; 
          if (cifras_fc==3) buffer_valor_fc="0" + buffer_valor_fc;
    
          cifras_fc=1;


          
          
          Serial.println(buffer_valor_fc);
          buffer_valor_fc.toCharArray(msj,5); // aca es donde lo convierto a un array the char, esto era lo que no me acordaba
          esp_1.publish(topic,msj);
          //i=0;
          buffer_valor_fc="";

              
       }
         

      if (valor_ecg_filter>=3000) //Peak DEtection- Threshold Value 
      {

        if (primer_valor_ecg_filter< valor_ecg_filter){//determina si es el pico mas alto
         
           if (d_almacenado == 0){//bandera para reconocer si ya adquirio un dato
          
            d_almacenado=1;
            tiempo_ant=tiempo_act;
            contador_pulso++;
            tiempo_act=millis ();
            tpp=tiempo_act- tiempo_ant;//calculo el tiempo entre pico y pico en ms
            //digitalWrite (13, HIGH);
         }
        }
      } else {
          //digitalWrite (13, LOW);
          d_almacenado=0;
          
        }



      ////////////////////////////////////////////////////////////
      
      comprobar_ecg=valor_ecg_filter;


      temp_frec =millis();

      if ((temp_frec-refresh_temp>5000)&&(i==26)){
        
          
          
          valor_temp=analogRead(A3);
          comprobar_temp=valor_temp;
    
          while (comprobar_temp/10>0)
          {
            comprobar_temp=comprobar_temp/10; //saco la cantidad de cifras que tiene el dato
            cifras_temp+=1;
            }
          
          buffer_valor_temp =String(valor_temp); //armo los paquetes de 4 bytes
          
          if (cifras_temp==1) buffer_valor_temp="000" +buffer_valor_temp;
          if (cifras_temp==2) buffer_valor_temp="00" +buffer_valor_temp; 
          if (cifras_temp==3) buffer_valor_temp="0" +buffer_valor_temp;
    
          cifras_temp=1;
          }// IF
      
      while (comprobar_ecg/10>0)
      {
        comprobar_ecg=comprobar_ecg/10; //saco la cantidad de cifras que tiene el dato
        cifras_ecg+=1;
        }

      buffer_valor_ecg =String(valor_ecg_filter); //armo los paquetes de 4 bytes
      
      if (cifras_ecg==1) buffer_valor_ecg="000" +buffer_valor_ecg;
      if (cifras_ecg==2) buffer_valor_ecg="00" +buffer_valor_ecg; 
      if (cifras_ecg==3) buffer_valor_ecg="0" +buffer_valor_ecg;
      
      cifras_ecg=1;

    if ((i==26)&&(temp_frec-refresh_temp>5000)){
        //Paso un BUFFER de 30 DATOS Para graficar en la gui de PYTHON
         buffer_msj.concat(buffer_valor_ecg);
         buffer_msj.concat(buffer_valor_temp);
         //Serial.println(buffer_msj);
         buffer_msj.toCharArray(msj,109); // aca es donde lo convierto a un array the char, esto era lo que no me acordaba
          esp_1.publish(topic,msj);
          i=0;
          refresh_temp=temp_frec;
          buffer_msj="";
         
        //y los concateno
      }else {
        //Paso un BUFFER de 29 DATOS Para graficar en la gui de PYTHON
        
        buffer_msj.concat(buffer_valor_ecg);
        
        if (i==26){
         //Serial.println(buffer_msj);
        buffer_msj.toCharArray(msj,105); // aca es donde lo convierto a un array the char, esto era lo que no me acordaba
        esp_1.publish(topic,msj);
        i=0;
        buffer_msj=""; }
        
       }
      /*if ((i==26)&&(temp_frec-refresh_temp>5000)){
        //Paso un BUFFER de 30 DATOS Para graficar en la gui de PYTHON
         buffer_msj.concat(buffer_valor_ecg);
         buffer_msj.concat(buffer_valor_temp);
         Serial.println(buffer_msj);
         buffer_msj.toCharArray(msj,109); // aca es donde lo convierto a un array the char, esto era lo que no me acordaba
          esp_1.publish(topic,msj);
          i=0;
          refresh_temp=temp_frec;
          buffer_msj="";
         
        //y los concateno
      }else {
        //Paso un BUFFER de 29 DATOS Para graficar en la gui de PYTHON
        
        buffer_msj.concat(buffer_valor_ecg);
        
        if (i==26){
         Serial.println(buffer_msj);
        buffer_msj.toCharArray(msj,105); // aca es donde lo convierto a un array the char, esto era lo que no me acordaba
        esp_1.publish(topic,msj);
        i=0;
        buffer_msj=""; }
        
       }*/
      

      
        
      }

}
/*long now =micros();
if (now- ultimo_msj>10)
{
  ultimo_msj=now;
  
  if ((digitalRead(lo_mas)==1)||(digitalRead(lo_menos)==1)){
    //Serial.println('!');
    
    }else{

      i+=1;
      valor=analogRead(A0);
      comprobar=valor;
      
      while (comprobar/10>0)
      {
        comprobar=comprobar/10;
        cifras+=1;
        }

      buffer_valor =String(valor);
      
      if (cifras==1) buffer_valor="000" +buffer_valor;
      if (cifras==2) buffer_valor="00" +buffer_valor; 
      if (cifras==3) buffer_valor="0" +buffer_valor;
      
      cifras=1;
      buffer_msj.concat(buffer_valor);

      if (i==30) {
        
        buffer_msj.toCharArray(msj,121);
        esp_1.publish(topic,msj);
        i=0;
        buffer_msj="";
        }
      }
  
  
  
  //snprintf (msj, 9, "%d", valor);
  //Serial.print("Mensaje publicado: ");
  //Serial.println(msj);
 
  
  }

*/

}
