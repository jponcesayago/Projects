/*
Arduino-MAX30100 oximetry / heart rate integrated sensor library
Copyright (C) 2016  OXullo Intersecans <x@brainrapers.org>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
#include <PubSubClient.h>
//#include <WiFi.h>
#include <ESP8266WiFi.h>
#include <Wire.h>
#include "MAX30100_PulseOximeter.h"

#define REPORTING_PERIOD_MS     10

// PulseOximeter is the higher level interface to the sensor
// it offers:
//  * beat detection reporting
//  * heart rate calculation
//  * SpO2 (oxidation level) calculation

const char* ssid="Fibertel WiFi793 2.4GHz";
const char* password="00416443955";

char* topic= "esp_1/pote1";
const char* broker="192.168.0.185";
char msj[4];

byte i=0;

bool max30100_connected=false;
uint8_t spo2=0;
uint8_t cifras_spo2=1;
uint8_t  comprobar_spo2=0;
uint8_t comprobar_fc=0;
uint8_t cifras_fc=1;
uint16_t spo2Acc=0;
uint16_t fcAcc=0;

int fc=0;


String buffer_valor_spo2="";
String buffer_valor_fc="";
String buffer_msj="";

WiFiClient cliente_wifi;
PubSubClient esp_1(cliente_wifi);


PulseOximeter pox;

uint32_t tsLastReport = 0;
unsigned long uploadMillisTimer;
unsigned long refreshFcSpo2 = 0;


//Configuración Wifi
void config_wifi()

{
  //Serial.println();
  //Serial.print("Conectando a");
  //Serial.println(ssid);

  WiFi.begin(ssid,password);

  while (WiFi.status()!=WL_CONNECTED){
    delay(500);
    Serial.print(".");
    
    
    }
  

randomSeed(micros());

//Serial.println("");
//Serial.println("WiFi conectado");
//Serial.println("Direccion ip: ");
//Serial.println(WiFi.localIP());
}


 void callback(char* topic, byte* payload, unsigned int length)
  {
    //Serial.print("Mensaje recibido[");
    //Serial.print(topic);
    //Serial.print("] ");
    for (int i =0; i<length;i++)
    {
      //Serial.print((char)payload[i]);
      
      }

     //Serial.println();

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
      //Serial.print("Intentando realizar conexion con el servidor  MQTT");
      String Id_cliente="ESP8266_12f";
      Id_cliente+=String(random(0xffff),HEX);

      if(esp_1.connect(Id_cliente.c_str()))
      {
        Serial.println("Conectado");
        //esp_1.publish(topic,"hello world");
        //esp_1.subscribe(topic);
        
        }else
        {//Serial.print("failed,rc=");
        //Serial.print(esp_1.state());
        //Serial.println("Se realizara un nuevo intento en 5 segundos");
         delay(5000); 
          
          }
        
      
      }
    
    
    
    }

// Callback (registered below) fired when a pulse is detected
void onBeatDetected()
{
    //Serial.println("Beat");
    buffer_msj="Beat";
    buffer_msj.toCharArray(msj,5);
    esp_1.publish(topic,msj);
    buffer_msj="";
}

void setup()
{
    Serial.begin(115200);
    config_wifi();
    esp_1.setServer(broker,1883);
    esp_1.setCallback(callback);
  
   Serial.print("Initializing pulse oximeter..");

    // Initialize the PulseOximeter instance
    // Failures are generally due to an improper I2C wiring, missing power supply
    // or wrong target chip
  if (!pox.begin()) {
        Serial.println("FAILED");
        //for(;;);
    } else {
        Serial.println("SUCCESS");
    }

    // The default current for the IR LED is 50mA and it could be changed
    //   by uncommenting the following line. Check MAX30100_Registers.h for all the
    //   available options.
    // pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);

    // Register a callback for the beat detection
   pox.setOnBeatDetectedCallback(onBeatDetected);
}

//////////////////////////////////////////////////
//BandPass Filter

float EMA_ALPHA_LOW = 0;
float EMA_ALPHA_HIGH = 0.1;
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


void loop()
{



 if(!esp_1.connected()){
      
    reconnect();
    
    }
  esp_1.loop();

 /* if ((esp_1.connected())&&(max30100_connected==false)) {
    
    if (!pox.begin()) {
        Serial.println("FAILED");
         max30100_connected=false;
        //for(;;);
    } else {
        Serial.println("SUCCESS");
         max30100_connected=true;
    }*/

  
  

   
    //Serial.println("SUCCESS");
//  }

  
    // Make sure to call update as fast as possible
    pox.update();

    uploadMillisTimer = millis();
    
    // Asynchronously dump heart rate and oxidation levels to the serial
    // For both, a value of 0 means "invalid"
    if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
        //Serial.print("Heart rate:");
        //Serial.print(pox.getHeartRate());
        //Serial.print("bpm / SpO2:");
        //Serial.print(pox.getSpO2());
        spo2=pox.getSpO2();
        //fc=(int)pox.getHeartRate();
        //Serial.println("%");

         fc = (int)EMABandPassFilter(pox.getHeartRate());
         
         Serial.println(fc);
         Serial.println(pox.getSpO2());

        //Increment Counter
        i+=1;

        
        //Serial.println(spo2Acc);
        //Serial.println(fcAcc);
        //Serial.println(i);

       if ((uploadMillisTimer - refreshFcSpo2> 500)&&(i>=50))
      {

        comprobar_fc=fc;
       while (comprobar_fc/10>0)
      {
        comprobar_fc=comprobar_fc/10; //saco la cantidad de cifras que tiene el dato
        cifras_fc+=1;
        }

        //Serial.println(cifras_fc);

         buffer_valor_fc =String(fc); //armo los paquetes de 4 bytes
      
      if (cifras_fc==1) buffer_valor_fc="00" +buffer_valor_fc;
      if (cifras_fc==2) buffer_valor_fc="0" +buffer_valor_fc; 
      //if (cifras_spo2==3) buffer_valor_ecg="0" +buffer_valor_ecg;

        
        cifras_fc=1;
        
        comprobar_spo2=spo2;
         while (comprobar_spo2/10>0)
      {
        comprobar_spo2=comprobar_spo2/10; //saco la cantidad de cifras que tiene el dato
        cifras_spo2+=1;
        }

        //Serial.println(cifras_spo2);


       buffer_valor_spo2 =String(spo2); //armo los paquetes de 4 bytes
      
      if (cifras_spo2==1) buffer_valor_spo2="00" +buffer_valor_spo2;
      if (cifras_spo2==2) buffer_valor_spo2="0" +buffer_valor_spo2; 
      //if (cifras_spo2==3) buffer_valor_ecg="0" +buffer_valor_ecg;

        
        cifras_spo2=1;

      buffer_msj.concat(buffer_valor_fc);
      buffer_msj.concat(buffer_valor_spo2);
       
         //buffer_valor_spo2.toCharArray(msj,4); // aca es donde lo convierto a un array the char, esto era lo que no me acordaba
         buffer_msj.toCharArray(msj,7); // aca es donde lo convierto a un array the char, esto era lo que no me acordaba
         
         //Serial.println(buffer_valor_spo2);
         //Serial.println(buffer_valor_fc);
          esp_1.publish(topic,msj);
         // i=0;
          //refresh_temp=temp_frec;
          buffer_msj="";

        
        //Reset Accumulators, counters and Timers
        refreshFcSpo2 = uploadMillisTimer;
        spo2Acc = 0;
        fcAcc = 0;
        i=0;
    
        
      }
       
       
        

        tsLastReport = millis();
    }
}
