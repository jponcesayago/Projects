from PyQt5 import QtWidgets, uic
from pyqtgraph import PlotWidget, plot
import pyqtgraph as pg
import sys
import os
import gc
from parse import *
from mainwindow import *
import paho.mqtt.client as mqtt 
from pyqtgraph.Qt import QtGui, QtCore 
from PyQt5.QtCore import Qt,pyqtSlot,QTimer,QTime, QDateTime, QDate,QAbstractTableModel, QModelIndex, QAbstractItemModel , QModelIndex , QItemSelectionModel
from PyQt5.QtWidgets import QHBoxLayout, QAbstractItemView, QTableView,QProgressDialog,QGraphicsProxyWidget,QLabel,QGraphicsLayout,QGraphicsObject,QGraphicsWidget, QApplication, QMainWindow, QDialog, QPushButton ,QGraphicsView,QGraphicsLayoutItem,QPushButton
import random
from datetime import datetime
from PyQt5.QtGui import QPainter, QBrush, QPen , QIntValidator
from PyQt5.QtCore import Qt,QPropertyAnimation
from playsound import playsound
import time
import MySQLdb
import mysql.connector
from mysql.connector import Error




#global bufferFull
#global 

u=0


idpatient = 1;
nameFlag=False
lastNameFlag=False
dniNumberFlag=False
celPhoneFlag=False
streetFlag=False
cityFlag=False

BeatSignal = False
bufferFullTemp = False
bufferFull = False
GraphFull = False
timerTick = False
spo2MsjReceived = False
HrMsjReceived = False

Server="192.168.0.185"
broker_port=1883
topic="esp_1/pote1"
tempValue=0
dataX= []
dataY=[]
dataGraph= []
dataX_temp=[]
dataY_temp=[]
client=mqtt.Client()

spo2 = 0
fc = 0


t = QTimer()


actualDate = datetime.now()





def on_connect(client, userdata, flags, rc):
    print("Conectado - Codigo de resultado: "+str(rc))
    client.subscribe(topic)


def on_message(client, userdata, msg):
    global buffer_ecg,BeatSignal
    buffer_ecg=msg.payload.decode('UTF-8')
    pg.QtGui.QApplication.processEvents()
    #plotearTest()
    
    #print(len(buffer_ecg))
    #if (buffer_ecg=='Beat'):
    #    BeatSignal=True
    #    playsound('heartbeat.mp3')
        #print(buffer_ecg)
    #    window.senales_ref.update()
        
    if (len(buffer_ecg)==104):
        #print('ECG')
        #actualizar_datos_ecg()
        #window.senales_ref.actualizar_datos_ecg()
        window.actualizar_datos_ecg()
        
    if (len(buffer_ecg)==108):
        #print("Temp") 
        window.actualizar_datos_temp()

    if (len(buffer_ecg)==6):
        global spo2MsjReceived
        #print("Spo2") 
        window.senales_ref.actualizar_datos_spo2_fc()
        spo2MsjReceived = True

    if (len(buffer_ecg)==4):
        #print("Hr")
        ##print(buffer_ecg)
        window.senales_ref.actualizar_datos_ecg_fc()
        

client.on_message = on_message
client.on_connect= on_connect

########################### Ventana Principal ################################

class MainWindow(QMainWindow,Ui_MainWindow):
    def __init__(self, *args, **kwargs):
        QMainWindow.__init__(self, *args, **kwargs)
        self.setupUi(self)
        self.connect_mqtt.clicked.connect(self.conectar_mqtt)
        self.actionSalir.triggered.connect(self.cerrar_aplicacion)
        self.actionVer_signal.setEnabled(False)
        self.actionVer_signal.triggered.connect(self.mostrar_senales)
        self.actionRegistro_de_Datos.triggered.connect(self.mostrarDataBaseWindow)
        self.actionImportar_Archivos.triggered.connect(self.ImportFilesWindowShow)

        #self.actionSalir.setMouseTracking(True)
        #self.actionRegistro_de_Datos.setMouseTracking(True)
        #self.actionVer_signal.setMouseTracking(True)
        #self.actionImportar_Archivos.setMouseTracking(True)
        
        self.setMouseTracking(True)

    def mouseMoveEvent(self, event):
        pos = event.pos()
        #print(pos)
        #self.mouseMoveEvent(self, event)
        

    def setMouseTracking(self, flag):
        def recursive_set(parent):
            for child in parent.findChildren(QtCore.QObject):
                try:
                    child.setMouseTracking(flag)
                except:
                    pass
                recursive_set(child)
        QMainWindow.setMouseTracking(self, flag)
        recursive_set(self)

    def closeEvent(self,event):
        self.cerrar_aplicacion()

    def cerrar_aplicacion(self):

        exitMsgBox =   QtGui.QMessageBox(self)
        exitMsgBox.setIcon(QtGui.QMessageBox.Question)
        exitMsgBox.setWindowTitle('Salir del programa')
        exitMsgBox.setText('Desea Salir?')
        self.YesExitButton = exitMsgBox.addButton("Si", QtGui.QMessageBox.YesRole)
        NoExitButton = exitMsgBox.addButton("No", QtGui.QMessageBox.NoRole)
        #print(self.YesExitButton)
        #print(NoExitButton)
        #self.exitMsgBox.buttonClicked.connect(self.YesPressed)
        
        ret = exitMsgBox.exec_()
        if exitMsgBox.clickedButton()==self.YesExitButton:
            print("Extracting Naaaaaaoooww!!!!")
            client.disconnect()
            sys.exit()
            
        
    def ImportFilesWindowShow(self):
        self.importfileswindow = importFilesWindow()
        self.importfileswindow.show()
        pg.QtGui.QApplication.processEvents()
        
    def mostrarDataBaseWindow(self):
        self.databasewindow = dataBaseWindow()
        self.databasewindow.show()
        pg.QtGui.QApplication.processEvents()
        
    def mostrar_senales(self):
        #app = QtWidgets.QApplication(sys.argv)
        #window = Area_grafico()
        #window.show()
        #app.instance().exec_()
        #sys.exit(app.exec_())
        #self.senales_ref= Senales(self)
        self.senales_ref= Area_grafico()#Senales(self)
        self.senales_ref.show()
        pg.QtGui.QApplication.processEvents()


    def actualizar_datos_ecg(self):
        #print('ECG')
        #print(buffer_ecg)
        
        global i,dataX,dataY,dataGraph,bufferFull,GraphFull #uso las listas globales que declare arriba
        y=0
        #print(i)

        if i>530:
                
            #dataGraph=dataY
            #print(dataGraph)
            dataX.clear()
            dataY.clear()
            GraphFull=True
            i=0
            self.ecgPlot.clear()
            pq.QtGui.QApplication.processEvents()
        
        while (y<len(buffer_ecg)): #        
    
            signal_ecg=int(buffer_ecg[y:y+4])
            #print(signal_ecg)
            #print(y)
            y+=4
            i+=1
            
            dataX.append(i)
            dataY.append(signal_ecg)
            
            
        bufferFull=True

        
    def actualizar_datos_temp(self):
        #print('Temp')
        global i,dataX,dataY,dataY_temp,dataX_temp,j,tempValue,GraphFull,bufferFullTemp
        y=0
        while (y<len(buffer_ecg)): #
            #print("Temp")    
            signal_ecg=int(buffer_ecg[y:y+4])
            y+=4
            if(y<=104):
                if i>530:
                    GraphFull=True
                    dataX.clear()
                    dataY.clear()
                    self.ecgPlot.clear()
                    pq.QtGui.QApplication.processEvents()
                    i=0
                    
                #print('.')
                dataX.append(i)
                dataY.append(signal_ecg)
                i+=1
                
                
                
            if(y>104):
                #print(signal_ecg)
                tempValue=0.051724137*signal_ecg;   
                #j+=1
                #print(j)
                #self.tempDisplay.display(signal_ecg)
                #palette = self.tempDisplay.palette()

                              
                #if signal_ecg>15:
        ##        # color numeros
                #    palette.setColor(palette.WindowText, QtGui.QColor(255, 0, 0))
                #else:
                 #   palette.setColor(palette.WindowText, QtGui.QColor(0, 0, 255))
        ##        # color fondo
        ##        palette.setColor(palette.Background, QtGui.QColor(0, 170, 255))
        ##        # borde claro
        ##        palette.setColor(palette.Light, QtGui.QColor(255, 0, 0))
        ##        # borde oscuro
        ##        palette.setColor(palette.Dark, QtGui.QColor(0, 255, 0))
                #self.tempDisplay.setPalette(palette)
        
                #QtGui.QApplication.processEvents()
                
                
        bufferFullTemp=True    
           
   
        
    def conectar_mqtt(self):
        self.connect_mqtt.setEnabled(False)
        try:
            client.connect(Server,broker_port , 10)
            self.label_3.setText("Conectado")
            self.actionVer_signal.setEnabled(True)
        except:
            print("No se pudo conectar con el MQTT Broker...")
            print("Cerrando...")
            self.connect_mqtt.setEnabled(True)
            eleccion= QtGui.QMessageBox.question(self, 'Aviso',
                                            "No se ha podido realizar la conexión con el servidor MQTT",
                                            QtGui.QMessageBox.Ok)


            
################################ Ventana Visualización de Datos ShortCut CRTL + T ###########################

class Area_grafico(QtWidgets.QMainWindow):

    InitDraw=True
    DrawInitCount=0
    
    def __init__(self, *args, **kwargs):
        super(Area_grafico, self).__init__(*args, **kwargs)

        #Load the UI Page
        uic.loadUi('signalwindow.ui', self)
        self.setupUI()
        
        global i
        global j

        i=0
        j=0
        
        client.loop_start()

        
        
        #Timer refresco Label DateTime

        self.tLabelDateTime = QtCore.QTimer()
        self.tLabelDateTime.timeout.connect(self.updateLabelDateTime)
        self.tLabelDateTime.start(1000)
        

        #Timer resfresco datos MQTT
        self.t = QtCore.QTimer()
        self.t.timeout.connect(self.updateData)
        self.t.start(1)

        #Timer refresco Spo2-Ecg Heart Rate

        self.spo2HrTimer = QtCore.QTimer()
        self.spo2HrTimer.timeout.connect(self.updateSpo2HrData)
        self.spo2HrTimer.start(400)


        
        
        #self.paintEventHeartBeat(self)

    def updateLabelDateTime(self):
        #print('Date')
        actualDate = datetime.now()
        self.DateLabel.setText(actualDate.strftime("%d/%m/%Y , %H:%M:%S"))
        
    def closeEvent(self,event):
        #print('close')
        client.loop_stop()
        dataX.clear()
        dataY.clear()
        self.ecgSignalCurve.setData(dataX,dataY)
        pg.QtGui.QApplication.processEvents()
        
    def updateSpo2HrData(self):
        global spo2MsjReceived,spo2,fc
        
        
        if (spo2MsjReceived == True):
            print (fc)
            print (spo2)
            spo2MsjReceived=False
            self.spo2Display.display(spo2)
            self.FrDisplay.display(fc)
            pg.QtGui.QApplication.processEvents()
            


        
    def updateData(self):
        global bufferFull,dataX,dataY,GraphFull,tempValue,bufferFullTemp,timerTick

        if (bufferFullTemp==True):
            bufferFullTemp=False
            
            #Display Numbers Color
            
            palette = self.tempDisplay.palette()
            
            if tempValue>38:
                palette.setColor(palette.WindowText, QtGui.QColor(255, 0, 0))
            else:
                if tempValue<35:
                    palette.setColor(palette.WindowText, QtGui.QColor(0, 0, 255))
                else:
                    palette.setColor(palette.WindowText, QtGui.QColor(0, 0, 0))
                
            self.tempDisplay.setPalette(palette)
            self.ecgSignalCurve.setData(dataX,dataY)
            self.tempDisplay.display(tempValue)
            pg.QtGui.QApplication.processEvents()
            
            
        if (bufferFull==True):
            bufferFull=False
            self.ecgSignalCurve.setData(dataX,dataY)
            pg.QtGui.QApplication.processEvents()

        if (GraphFull==True):
            GraphFull=False
            dataClear=[]
            self.ecgSignalCurve.setData(dataClear,dataClear)
            self.ecgSignalCurve.clear()
            pg.QtGui.QApplication.processEvents()
            self.ecgSignalCurve.setData(dataX,dataY)
            pg.QtGui.QApplication.processEvents()
            
            
            
            
        #print('dato')
            
    def setupUI(self):
        #self.ecgPlot.plot([1,2,3,4,5,6,7,8,9,10], [30,32,34,32,33,31,29,32,35,45])
        self.ecgPlot.setTitle(title="Señal cardiaca en tiempo real")
        self.ecgPlot.enableAutoRange(enable=False)
        self.ecgPlot.setRange(yRange=[0, 4095])
        self.ecgPlot.setRange(xRange=[0, 500])
        self.ecgSignalCurve = self.ecgPlot.plot(pen='w',clear=True)
        
        

        self.DateLabel.setText(actualDate.strftime("%d/%m/%Y , %H:%M:%S"))        
        #self.tempPlot.setTitle(title="Temperatura actual")
        #self.tempPlot.enableAutoRange(enable=False)
        #self.tempPlot.setRange(yRange=[0, 4095])
        #self.tempPlot.setRange(xRange=[0, 100])
        
        #temp=random.randint(0,50)
        self.tempDisplay.display(0)
        self.FrDisplay.display(0)
        self.spo2Display.display(0)
        self.ecgHrDisplay.display(0)
        
        #palette = self.tempDisplay.palette()
        #if temp>15:
##        # color numeros
        #    palette.setColor(palette.WindowText, QtGui.QColor(255, 0, 0))
        #else:
        #    palette.setColor(palette.WindowText, QtGui.QColor(0, 0, 255))
##        # color fondo
##        palette.setColor(palette.Background, QtGui.QColor(0, 170, 255))
##        # borde claro
##        palette.setColor(palette.Light, QtGui.QColor(255, 0, 0))
##        # borde oscuro
##        palette.setColor(palette.Dark, QtGui.QColor(0, 255, 0))
        #self.tempDisplay.setPalette(palette)

    def heartBeat(self):
        self.anim = QPropertyAnimation(self.Beat, b"color")
        self.anim.setDuration(200)
        self.anim.setLoopCount(1)
        self.anim.start()
        self.anim.stop()

    def paintEvent(self,event):
        #print('rect')
        painter =  QPainter(self)
        painter.setPen(QPen(Qt.black,  2, Qt.SolidLine))
        painter.drawRect(910, 20, 275, 25)
        
    #def paintEvent(self, event):
        #global InitDraw
        
        
        #if (self.InitDraw==False):
            #print('Erase')
        #    painter =  QPainter(self)
        #    painter.eraseRect(40, 5, 60, 60)
        #    painter.setPen(QPen(Qt.red,  8, Qt.SolidLine))
        #    painter.setBrush(QBrush(Qt.red, Qt.SolidPattern))
        #    painter.drawEllipse(50, 10, 30, 30)
            
            
        #if ((self.InitDraw==True)and(self.DrawInitCount<=2)):
        #    self.DrawInitCount+=1
        #    painter =  QPainter(self)
        #    print('Draw')
            #self.painter =  QPainter(self)
        #    if (self.DrawInitCount==2):
        #         self.InitDraw=False
            #if (self.InitDraw==False):
                #painter.eraseRect(40, 5, 60, 60)
                #print('Erase')
                #painter.setCompositionMode(QtGui.QPainter.CompositionMode_Clear)
               
            
        #    painter.begin(self)
        #    painter.setPen(QPen(Qt.red,  8, Qt.SolidLine))
        #    painter.setBrush(QBrush(Qt.red, Qt.SolidPattern))
        #    painter.drawEllipse(50, 10, 30, 30)
        #    painter.end()


            
            #painter.eraseRect(40, 5, 60, 60)
            #painter.end()
        #if (self.InitDraw==False):
            #painter.setCompositionMode(QtGui.QPainter.CompositionMode_Clear)
            #QPainter.eraseRect(0, 0, 200, 200)    
        

    def eraseCircle(self):
        print('Borrar')
        #self.painter = QtGui.QPainter(self)
        #self.painter.setCompositionMode(QtGui.QPainter.CompositionMode_Clear)
        QPainter.eraseRect(0, 0, 200, 200)
        
    def plot(self, hour, temperature):
        self.ecgPlot.plot(hour, temperature)
        
    def actualizar_datos_spo2_fc(self):
        global fc,spo2
        
        fc=int(buffer_ecg[0:3])
        #print(fc)
        spo2=int(buffer_ecg[3:6])
        #print(spo2)
        #self.spo2Display.display(spo2)
        #self.FrDisplay.display(fc)
        #pg.QtGui.QApplication.processEvents()

    def actualizar_datos_ecg_fc(self):
        ecgHr=int(buffer_ecg)
        #print(ecgHr)
        self.ecgHrDisplay.display(ecgHr)
        if (ecgHr > 100):
            self.LabelEcgState.setText('ARRITMIA TAQUICARDIA')
        if ((ecgHr<=100) and (ecgHr> 60)):
            self.LabelEcgState.setText('NORMAL')
        if (ecgHr<60):
            self.LabelEcgState.setText('ARRITMIA BRADICARDIA')
        pg.QtGui.QApplication.processEvents()
            
        

#################### Ventana Registro de Datos Shorcut: CRTL + R ############################

class dataBaseWindow(QtWidgets.QMainWindow):
    def __init__(self, *args, **kwargs):
        super(dataBaseWindow, self).__init__(*args, **kwargs)
        uic.loadUi('databasewindow.ui', self)
        
        actualDate = QDate.currentDate()
        actualTime = QTime.currentTime()
        self.datePickerBegin.setDate(actualDate)
        self.datePickerEnd.setDate(actualDate)
        self.datePickerEnd.setTime(actualTime)
        self.datePickerEnd.setMaximumDate(actualDate)
        self.datePickerBegin.setMaximumDate(actualDate)
        self.actionSalir.triggered.connect(self.closeDataBaseWindow)
        self.actionInicio_de_Registro_de_Se_ales.triggered.connect(self.dataAdqWindowShow)
        self.actionConectar_a_Base_de_Datos.triggered.connect(self.dataBaseReConnect)
        self.actionRegistro_Nuevo_Paciente.triggered.connect(self.newPatientRegShow)
        self.searchButton.clicked.connect(self.studiesSearch)

        #Table Configuration

        self.registerStudiesTable = QTableView(self) #Create a Table
        self.registerStudiesTable.move(30,100)
        self.registerStudiesTable.setFixedSize(730,480)
        
        self.registerStudiesTable.setAlternatingRowColors(True)
        self.registerStudiesTable.setAutoScroll(True)

       

        self.registerStudiesTable.update()
        
        self.registerStudiesTable.clicked.connect(self.studySelected)
        
        
        
        

        #Activate Mouse Tracking
        self.setMouseTracking(True)
        self.datePickerEnd.setMouseTracking(True)
        self.datePickerBegin.setMouseTracking(True)
        self.searchButton.setMouseTracking(True)

        #Data Base Initializtion
        self.dataBaseReConnect()

        if (self.dataBaseConnected):
            print('True')
            self.studiesSearch()
            
        

    #Tracking functions##############################
    def setMouseTracking(self, flag):
        def recursive_set(parent):
            for child in parent.findChildren(QtCore.QObject):
                try:
                    child.setMouseTracking(flag)
                except:
                    pass
                recursive_set(child)
        QtWidgets.QMainWindow.setMouseTracking(self, flag)
        recursive_set(self)

    def mouseMoveEvent(self, event):
        pos = event.pos()
        #print(pos)

    ################################################

    def newPatientRegShow(self):
        self.newpatientreg = newPatientReg()
        self.newpatientreg.show()
        pg.QtGui.QApplication.processEvents()

    def dataAdqWindowShow(self):
        self.dataadqwindow = dataAdqWindow()
        self.dataadqwindow.show()
        pg.QtGui.QApplication.processEvents()


    def studiesSearch(self):
        beginDate = self.datePickerBegin.date().toString("yyyy-MM-dd")
        beginTime = self.datePickerBegin.time().toString("hh:mm:ss")
        endDate = self.datePickerEnd.date().toString("yyyy-MM-dd")
        endTime = self.datePickerEnd.time().toString("hh:mm:ss")

        beginDateTime = beginDate + ' ' + beginTime;
        endDateTime = endDate + ' ' + endTime;
        print(beginDateTime,endDateTime)

        #Fetch Data from Clinical studies Table

        #studiesByDateQuery = """SELECT idpatient,idstudytype,studydate FROM  clinicalstudiesform WHERE studydate BETWEEN ('%s') AND ('%s')""" % (beginDateTime,endDateTime)
        studiesByDateQuery = """SELECT patientform.name,patientform.lastname,patientform.dni,clinicalstudiesform.studydate,studytypes.studytypename FROM `patientform` INNER JOIN `clinicalstudiesform` ON patientform.idpatient = clinicalstudiesform.idpatient INNER JOIN `studytypes` ON clinicalstudiesform.idstudytype = studytypes.idstudytype  WHERE clinicalstudiesform.studydate BETWEEN ('%s') AND ('%s')""" % (beginDateTime,endDateTime)
        #print(studiesByDateQuery)
    
        #get patients IDs
        
        #patiensId = studiesByDateQuery[

        try:
            self.sismsbiDataBase = mysql.connector.connect(host=Server,user="sismsbiuser",password="1234",database="sismsbidatabase")
            self.sismsbiCursor = self.sismsbiDataBase.cursor()
            self.sismsbiCursor.execute(studiesByDateQuery)
            
            studyData = self.sismsbiCursor.fetchall()
            print(studyData)


            #Set Table Data

            self.registerStudiesTableModel = registerStudiesTableModel(studyData) #Custom Model retrieve from the Class
            
            
            
            self.registerStudiesTable.setModel(self.registerStudiesTableModel)
            self.registerStudiesTable.update()

            self.registerStudiesTable.setColumnWidth(2,100)#Set Date Columns Width
            self.registerStudiesTable.setColumnWidth(3,178)#Set Date Columns Width
            self.registerStudiesTable.setColumnWidth(4,180)#Set Study Type Columns Width
            
            self.registerStudiesTable.setVerticalScrollMode(QAbstractItemView.ScrollPerItem) #Scroll Cada un item


            self.registerStudiesTable.setSelectionBehavior(QtGui.QAbstractItemView.SelectRows) #Selecciona la Fila entera
            self.registerStudiesTable.setSelectionMode(QtGui.QAbstractItemView.SingleSelection) #Seleccion simple
            
            
            #self.registerStudiesTable.setFocus()
            #self.registerStudiesTable.setFocusPolicy(Qt.StrongFocus)
            
            
            self.registerStudiesTable.selectRow(0)

            
        except Error as e:
            print("Error",e)
        
        
        #print(beginDate,endDate)
        

    def dataBaseReConnect(self):

        try:
            self.sismsbiDataBase = mysql.connector.connect(host=Server,user="sismsbiuser",password="1234",database="sismsbidatabase")
            self.searchButton.setEnabled(True)
            self.datePickerBegin.setEnabled(True)
            self.datePickerEnd.setEnabled(True)
            self.dataBaseConnected = True
            #print(sismsbiDataBase)
            print("Conectado a base de datos sismsbidatabase")

        except Error as e:
            print("No se pudo conectar con la base de datos",e)
            #print("Cerrando...")
            #sys.exit()
            self.searchButton.setEnabled(False)
            self.datePickerBegin.setEnabled(False)
            self.datePickerEnd.setEnabled(False)
            patientDataBaseWindowMsgBox =   QtGui.QMessageBox(self)
            patientDataBaseWindowMsgBox.setIcon(QtGui.QMessageBox.Information)
            patientDataBaseWindowMsgBox.setWindowTitle('Registro de datos')
            patientDataBaseWindowMsgBox.setText('No se ha podido realizar la conexión con la base de datos')
            patientDataBaseWindowMsgBox.exec_()
        
    def studySelected(self):
        pass

           
    def closeDataBaseWindow(self):
        #print('close')
        window.databasewindow.close()


#################### Tabla Estudios Regitrados ##################################

class registerStudiesTableModel(QtCore.QAbstractTableModel):
    def __init__(self, data):
        super(registerStudiesTableModel, self).__init__()
        self._data = data
        
    def data(self, index, role):
        
        column = index.column()
        row = index.row()

        if role == Qt.DisplayRole:
            if column == 0:
                return self._data[row][column]
            if column == 1:
                return self._data[row][column]
            if column == 2:
                return self._data[row][column]
            if column == 3:
                date = "{}".format(self._data[row][column])
                return date
            if column == 4:
                return self._data[row][column]
            
        elif role == Qt.TextAlignmentRole:
            return Qt.AlignVCenter + Qt.AlignRight
        
            # See below for the nested-list data structure.
            # .row() indexes into the outer list,
            # .column() indexes into the sub-list
            #return self._data[index.row()][index.column()]

    def rowCount(self, index):
        # The length of the outer list.
        return len(self._data)

    def columnCount(self, index):
        # The following takes the first sub-list, and returns
        # the length (only works if all rows are an equal length)
        return 5
    
    def headerData(self, section, orientation, role):
        if role != Qt.DisplayRole:
            return None
        if orientation == Qt.Horizontal:
            return ("Nombre","Apellido","DNI","FECHA","TIPO DE ESTUDIO")[section]
        else:
            return "{}".format(section)



#################### Ventana Registro de Datos - Registro Nuevo Paciente Shorcut: CRTL + N ############################
        
class newPatientReg(QtWidgets.QMainWindow):
    def __init__(self, *args, **kwargs):
        super(newPatientReg, self).__init__(*args, **kwargs)
        uic.loadUi('newpatientreg.ui', self)

        self.maritalStatusComboBox.addItem("Soltero") #Agrego los items al ComboBox
        self.maritalStatusComboBox.addItem("Casado")

        self.nameInput.textChanged.connect(self.nameInputChange)
        self.lastNameInput.textChanged.connect(self.lastNameInputChange)
        self.dniNumberInput.textChanged.connect(self.dniNumberInputChange)
        self.celPhoneInput.textChanged.connect(self.celPhoneInputChange)
        self.streetInput.textChanged.connect(self.streetInputChange)
        self.cityInput.textChanged.connect(self.cityInputChange)


        self.saveNewPatientButton.clicked.connect(self.saveNewPatientDb)
        

        self.intValidator = QIntValidator() # Creo un validador que permita solo datos númericos en los  QLineEdit
        self.dniNumberInput.setValidator(self.intValidator) #
        self.celPhoneInput.setValidator(self.intValidator)

        self.birthDateEdit.dateChanged.connect(self.birthDateChange) # Conecto la el evento de cambio de fecha de nacimiento con el slot para el calculo de la edad del paciente
        
       
        
        actualDate = QDate.currentDate() #Seteo propiedades QDateEdit
        self.birthDateEdit.setDate(actualDate)
        self.birthDateEdit.setMaximumDate(actualDate)
        
        self.saveNewPatientButton.setEnabled(False) #Deshabilito el boton guardar hasta que se completen todos los campos requeridos

        self.patientBirthDate = self.birthDateEdit.date()
        

        self.patientAgeCalculation(self.patientBirthDate) #LLamo a función para calcular la edad a partir de la fecha de nacimiento ingresada
        
        self.actionSalir.triggered.connect(self.closeNewPatientReg) #slots para señales de eventos click en el menu
        self.delRegButton.clicked.connect(self.deleteAllReg)

    def saveNewPatientDb(self):
        global idpatient
        #print('save')
        dataBaseConnected = False
        # Abrir conexión con bases de datos
        
        try:
            sismsbiDataBase = mysql.connector.connect(host=Server,user="sismsbiuser",password="1234",database="sismsbidatabase")
            dataBaseConnected = True
            print(sismsbiDataBase)
            print("Conectado a base de datos sismsbidatabase")

        except Error as e:
            print("No se pudo conectar con la base de datos",e)
            #print("Cerrando...")
            #sys.exit()
            patientDataSavedMsgBox =   QtGui.QMessageBox(self)
            patientDataSavedMsgBox.setIcon(QtGui.QMessageBox.Information)
            patientDataSavedMsgBox.setWindowTitle('Registro del paciente')
            patientDataSavedMsgBox.setText('No se ha podido guardar la información')
            patientDataSavedMsgBox.exec_()
            self.deleteAllReg()
            #self.closeNewPatientReg()
            

                #Preparando cursor
        if (dataBaseConnected):
            dbSismsbicursor = sismsbiDataBase.cursor()


            nameInputText = self.nameInput.text() # Obtengo todos los datos del paciente
            lastNameInputText = self.lastNameInput.text()
            dniNumberInputText = self.dniNumberInput.text()
            ageInputText = self.ageInput.text()

            maleRadioButtonState = self.maleRadioButton.isChecked()
            femaleRadioButton = self.femaleRadioButton.isChecked()

            if (maleRadioButtonState):
                genreRadioButtonText = 'Masculino'
            else:
                genreRadioButtonText = 'Femenino'

            maritalStatusComboBoxText = self.maritalStatusComboBox.currentText()

            patientBirthDateEdit = self.birthDateEdit.date()
            
            patientBirthDateEditParse = str(patientBirthDateEdit.year()) + '-' + str(patientBirthDateEdit.month()) + '-' + str(patientBirthDateEdit.day()) 
            
            celPhoneInputText = self.celPhoneInput.text()
            streetInputText = self.streetInput.text()
            cityInputText = self.cityInput.text()

            occupationInputText = "ocupacion" # Agregar al formulario de registro
            doctype = "DNI"
            
            print(genreRadioButtonText)
            print(maritalStatusComboBoxText)
            print(patientBirthDateEditParse)

            #Realizo el Insert con todos los datos obetenidos
            addPatient = """INSERT INTO `patientform` (`idpatient`,`name`,`lastname`,`birthdate`,`age`,`maritalstatus`,`ocupation`,`doctype`,`dni`,`genre`,`telephone`,`address`,`city`) VALUES (NULL, '""" + nameInputText +"""','""" + lastNameInputText + """', '""" + patientBirthDateEditParse +"""', '""" + ageInputText +"""','"""+ maritalStatusComboBoxText +"""','"""+ occupationInputText +"""','"""+ doctype +"""','"""+ dniNumberInputText +"""','"""+ genreRadioButtonText +"""','"""+ celPhoneInputText +"""','"""+ streetInputText +"""','"""+ cityInputText +"""');""" 

            print(addPatient)

            #agregar_dato = """INSERT INTO `señales` (`id`, `user`, `topic`, `msj`, `fecha`) VALUES (NULL, '"""+lista[1] + """', '"""+ lista[2]  + """', '"""+ str(msg.payload)+ """', CURRENT_TIMESTAMP);"""
            #agregar_dato = """INSERT INTO `signal` (`id`, `user`, `topic`, `msj`, `fecha`) VALUES (NULL, '""" + lista+ """', '""" + msg.topic + """', '""" + str(msg.payload) + """', CURRENT_TIMESTAMP);"""
            #print(agregar_dato)
            
            try:
                # Ejecutar un comando SQL
                dbSismsbicursor.execute(addPatient)
                sismsbiDataBase.commit()
                dbSismsbicursor.close()
                print("Guardando en base de datos...OK")

                patientDataSavedMsgBox =   QtGui.QMessageBox(self)
                patientDataSavedMsgBox.setIcon(QtGui.QMessageBox.Information)
                patientDataSavedMsgBox.setWindowTitle('Registro del paciente')
                patientDataSavedMsgBox.setText('Los datos se han guardado correctamente')
                patientDataSavedMsgBox.exec_()
                self.deleteAllReg()
                
            except Error as e:
                sismsbiDataBase.rollback()
                print("Guardando en base de datos...Falló",e)
                patientDataSavedMsgBox =   QtGui.QMessageBox(self)
                patientDataSavedMsgBox.setIcon(QtGui.QMessageBox.Information)
                patientDataSavedMsgBox.setWindowTitle('Registro del paciente')
                patientDataSavedMsgBox.setText('No se ha podido guardar la información')
                patientDataSavedMsgBox.exec_()
                
            sismsbiDataBase.close()

        
    ############ Funciones para validación del formulario del paciente #######################
         
    def nameInputChange(self, text):
        global nameFlag,lastNameFlag, dniNumberFlag, celPhoneFlag, streetFlag, cityFlag
        
        if (len(text)!=0):
            nameFlag = True
        else:
            nameFlag = False

        if (nameFlag) and (lastNameFlag) and (dniNumberFlag) and (celPhoneFlag) and (streetFlag) and (cityFlag):
            self.saveNewPatientButton.setEnabled(True)
        else:
            self.saveNewPatientButton.setEnabled(False)
        
        #print(nameFlag)

    def lastNameInputChange(self, text):
        global nameFlag,lastNameFlag, dniNumberFlag, celPhoneFlag, streetFlag, cityFlag
        
        if (len(text)!=0):
            lastNameFlag = True
        else:
            lastNameFlag = False
            
        #print(nameFlag)

        if (nameFlag) and (lastNameFlag) and (dniNumberFlag) and (celPhoneFlag) and (streetFlag) and (cityFlag):
            self.saveNewPatientButton.setEnabled(True)
        else:
            self.saveNewPatientButton.setEnabled(False)
            
    def dniNumberInputChange(self, text):
        global nameFlag,lastNameFlag, dniNumberFlag, celPhoneFlag, streetFlag, cityFlag
        
        if (len(text)!=0):
            dniNumberFlag = True
        else:
            dniNumberFlag = False
            
        #print(nameFlag)

        if (nameFlag) and (lastNameFlag) and (dniNumberFlag) and (celPhoneFlag) and (streetFlag) and (cityFlag):
            self.saveNewPatientButton.setEnabled(True)
        else:
            self.saveNewPatientButton.setEnabled(False)
            
    def celPhoneInputChange(self, text):
        global nameFlag,lastNameFlag, dniNumberFlag, celPhoneFlag, streetFlag, cityFlag
        
        if (len(text)!=0):
            celPhoneFlag = True
        else:
            celPhoneFlag = False
            
        #print(nameFlag)

        if (nameFlag) and (lastNameFlag) and (dniNumberFlag) and (celPhoneFlag) and (streetFlag) and (cityFlag):
            self.saveNewPatientButton.setEnabled(True)
        else:
            self.saveNewPatientButton.setEnabled(False)    
    def streetInputChange(self, text):
        global nameFlag,lastNameFlag, dniNumberFlag, celPhoneFlag, streetFlag, cityFlag
        
        if (len(text)!=0):
            streetFlag = True
        else:
            streetFlag = False
            
        #print(nameFlag)

        if (nameFlag) and (lastNameFlag) and (dniNumberFlag) and (celPhoneFlag) and (streetFlag) and (cityFlag):
            self.saveNewPatientButton.setEnabled(True)
        else:
            self.saveNewPatientButton.setEnabled(False)    
    def cityInputChange(self, text):
        global nameFlag,lastNameFlag, dniNumberFlag, celPhoneFlag, streetFlag, cityFlag
        
        if (len(text)!=0):
            cityFlag = True
        else:
            cityFlag = False
            
        #print(nameFlag)

        if (nameFlag) and (lastNameFlag) and (dniNumberFlag) and (celPhoneFlag) and (streetFlag) and (cityFlag):
            self.saveNewPatientButton.setEnabled(True)
        else:
            self.saveNewPatientButton.setEnabled(False)
            
    ###############################################################################################################

            
    def birthDateChange(self):
        #print('dateChange')
        patientBirthDate = self.birthDateEdit.date()
        print(patientBirthDate)
        self.patientAgeCalculation(patientBirthDate) #LLamo a función para calcular la edad a partir de la fecha de nacimiento ingresada
         
        
    def patientAgeCalculation(self, birthDate ):  #Calculo la edad del paciente
        #print(birthDate)
        
        actualDate = QDate.currentDate()
        patientAge = actualDate.year() - birthDate.year()  
        
        if (patientAge>0):
            
            if (birthDate.month() > actualDate.month()):
                patientAge = patientAge - 1
            else:
                if (birthDate.day() > actualDate.day()):
                    patientAge = patientAge - 1

        #print(patientAge)

        self.ageInput.setText(str(patientAge))
        
    def deleteAllReg(self): #Limpio todos los campos
        #print('delete')
        self.nameInput.setText("")
        self.lastNameInput.setText("")
        self.dniNumberInput.setText("")
        self.ageInput.setText("")
        self.celPhoneInput.setText("")
        self.streetInput.setText("")
        self.cityInput.setText("")
        self.maleRadioButton.setChecked(True)
        self.femaleRadioButton.setChecked(False)
        #self.maritalStatusComboBox.currentText('Soltero')

        actualDate = QDate.currentDate() #Seteo propiedades QDateEdit
        self.birthDateEdit.setDate(actualDate)      
        
    def closeNewPatientReg(self): #Cerrar ventana
        self.close()

    
#################### Ventana Registro de Datos - Adquisición de Datos Shorcut: CRTL + S ############################

class dataAdqWindow(QtWidgets.QMainWindow):
    def __init__(self, *args, **kwargs):
        super(dataAdqWindow, self).__init__(*args, **kwargs)

        uic.loadUi('dataadqwindow.ui', self) #IMPORTANTE PONER SIEMPRE AL PRINCIPIO SINO NO INICIALIZA LAS PROPIEDADES CORRECTAMENTE

        self.setMouseTracking(True)

        #Default Patient Selected ID
        self.patientId = 1
        

            
        #Table Configuration

        
        
        self.patientSelectionTable = QTableView(self) #Create a Table
        self.patientSelectionTable.move(30,200)
        self.patientSelectionTable.setFixedSize(580,225)
        
        self.patientSelectionTable.setAlternatingRowColors(True)
        self.patientSelectionTable.setAutoScroll(True)
        self.patientSelectionTable.setMouseTracking(True)
        
        
        self.patientSelectionTable.clicked.connect(self.patientSelected)


        #Table Layout

        self.tableHorLayout = QHBoxLayout(self)
        
        self.tableHorLayout.addWidget(self.patientSelectionTable)
        self.setLayout(self.tableHorLayout)
        
        
        #Harcoded Data
        
        data = [
          [4, 9, 2],
          [1, 0, 0],
          [3, 5, 0],
          [3, 3, 2],
          [7, 8, 9],
        ]

        


        
        
        #self.patientSelectionTable.show()

        #self.setCentralWidget(self.patientSelectionTableModel)
        
        
        #print(patientSelectionTableModel)

       
        
        #Timer Barra Progreso Adquisición de Datos

        self.tProgressBar = QtCore.QTimer()
        self.tProgressBar.timeout.connect(self.updateProgressBar)
        
        
        self.timeCont=0

        self.startAdqButton.setEnabled(False) #Deshabilito los controles hasta la correcta conexión con la dB
        self.dataAdqTypeStudComboBox.setEnabled(False)
        self.dataAdqFilterSearchField.setEnabled(False)
        #self.patientSelectionTable.setEnabled(False)
        #self.dataAdqPatientRegTableView.setEnabled(False)
        
        self.actionSalir.triggered.connect(self.closeDataAdqWindow) #slots para señales de eventos click en el menu
        self.startAdqButton.clicked.connect(self.startAdqData)
        #self.actionAbrir.triggered.connect(self.searchImportFiles)


        dataBaseConnected = False
        # Abrir conexión con bases de datos
        
        try:
            self.sismsbiDataBase = mysql.connector.connect(host=Server,user="sismsbiuser",password="1234",database="sismsbidatabase")
            dataBaseConnected = True
            #print(sismsbiDataBase)
            print("Conectado a base de datos sismsbidatabase")

        except Error as e:
            print("No se pudo conectar con la base de datos",e)
            #print("Cerrando...")
            #sys.exit()
            patientDataAdqMsgBox =   QtGui.QMessageBox(self)
            patientDataAdqMsgBox.setIcon(QtGui.QMessageBox.Information)
            patientDataAdqMsgBox.setWindowTitle('Registro de datos')
            patientDataAdqMsgBox.setText('No se ha podido realizar la conexión con la base de datos')
            patientDataAdqMsgBox.exec_()
            #self.deleteAllReg()
            #self.closeNewPatientReg()
            

        #Preparando cursor
        if (dataBaseConnected):

            self.sismsbiCursor = self.sismsbiDataBase.cursor()
            self.sismsbiCursor.execute("SELECT * FROM patientform")

            patientRegisTable = self.sismsbiCursor.fetchall() # Guardo el resultado de la consulta

            
            #print(patientRegisTable)

            patientData = []

            i = 0
            j = 0
            while (i<len(patientRegisTable)):
                while (j<len(patientRegisTable[i])):

                        if ((j==0)or(j==1)or(j==8)):    
                            patientData.append(patientRegisTable[i][j])
                            #print(j)
                        j+=1
                i+=1       
                j=0           

            #print(patientData)

            self.patientData = patientRegisTable

            #Set Table Data

            self.patientTableModel = patientSelectionTableModel(patientRegisTable) #Custom Model retrieve from the Class
            
            self.patientSelectionModel = QtCore.QItemSelectionModel(self.patientTableModel) #Selection Model
            
            self.patientSelectionTable.setModel(self.patientTableModel)
            self.patientSelectionTable.update()
            
            self.patientSelectionTable.setSelectionModel(self.patientSelectionModel)

            self.patientSelectionTable.setVerticalScrollMode(QAbstractItemView.ScrollPerItem) #Scroll Cada un item


            self.patientSelectionTable.setSelectionBehavior(QtGui.QAbstractItemView.SelectRows) #Selecciona la Fila entera
            self.patientSelectionTable.setSelectionMode(QtGui.QAbstractItemView.SingleSelection) #Seleccion simple
            #self.patientSelectionTable.setEditTriggers(QAbstractItemView.AllEditTriggers)
            
            self.patientSelectionTable.setFocus()
            self.patientSelectionTable.setFocusPolicy(Qt.StrongFocus)
            
            
            self.patientSelectionTable.selectRow(0)
            #print( self.patientSelectionModel.isRowSelected(0))
            
            
            
            #Set Combo Items
            comboItems = ['Completo','ECG','Oximetria-Frec. Cardíaca','Temperatura']
            self.dataAdqTypeStudComboBox.addItems(comboItems)
            
            self.startAdqButton.setEnabled(True) #Deshabilito los controles hasta la correcta conexión con la dB
            self.dataAdqTypeStudComboBox.setEnabled(True)
            self.dataAdqFilterSearchField.setEnabled(True)
            self.patientSelectionTable.setEnabled(True)
            #self.dataAdqPatientRegTableView.setEnabled(True)

              
    def patientSelected(self, clickedIndex):
        row = clickedIndex.row()
        model = clickedIndex.model()
        self.patientId = self.patientData[row][0]
        print(self.patientId)
        
    def updateProgressBar(self):
        self.timeCont+=1
        
        if (self.timeCont>=100):
            self.tProgressBar.stop()
            self.adqProgressBar.close()
            self.endAdquisitionMessageBox()
            
        if (self.adqProgressBar.wasCanceled()==True):
            self.tProgressBar.stop()
            self.timeCont=0
        else:
            self.adqProgressBar.setValue(self.timeCont)
            selectedStuId = self.dataAdqTypeStudComboBox.currentIndex() #idpatient
            patientId = self.patientId # idstudy
            temp = 35.82
            tempSaveQuery = """INSERT INTO tempsignalstudie (idpatient,idstudy,idstudytype,tempsignal) VALUES (%s,%s,%s,%s)""" 
            tempParameters = (patientId,self.idStudy,selectedStuId,temp)
            
            try:
                self.sismsbiCursor.execute(tempSaveQuery,tempParameters)
                self.sismsbiDataBase.commit()
            except Error as e:
                print(e)
            
        #print('progress')
        #window.databasewindow.dataadqwindow.adqProgressBar.setValue(self.timeCont)
        
        
       

        
    def startAdqData(self):
        #print('start')
        #window.databasewindow.dataadqwindow.


        self.dataAdqInterval = self.dataAdqtimeEdit.time() # formato time es (hh,mm,ss)
        #print(self.dataAdqInterval)
        StringDataAdqInterval = self.dataAdqInterval.toString()
        StringDataAdqIntervalSplit = StringDataAdqInterval.split(':')

        #print(StringDataAdqIntervalSplit[1]
        IntDataAdqIntervalMinutes = int(StringDataAdqIntervalSplit[1])*60
        IntDataAdqIntervalSeconds= int(StringDataAdqIntervalSplit[2])

        IntDataAdqIntervalTotal = IntDataAdqIntervalMinutes + IntDataAdqIntervalSeconds
        #print(IntDataAdqIntervalTotal)
        
        updateInterval = (IntDataAdqIntervalTotal/100)*1000
        
        #print(updateInterval)

        # ClinicalStudiesForm Table INSERT Data
        
        selectedStuId = self.dataAdqTypeStudComboBox.currentIndex() #idstudytype
        
        
        if (selectedStuId==0):
            selectedStuId=4
                
        patientId = self.patientId # idpatient
        studyDate = QDateTime.currentDateTime().toString("yyyy-MM-dd hh:mm:ss") #studydate
        adqTime =  IntDataAdqIntervalTotal #adqtime
        patientName = ""
        patientLastName = ""
        patientAge = "0"

        #print(studyDate)

        #addPatient = """INSERT INTO `patientform` (`idpatient`,`name`,`lastname`,`birthdate`,`age`,`maritalstatus`,`ocupation`,`doctype`,`dni`,`genre`,`telephone`,`address`,`city`) VALUES (NULL, '""" + nameInputText +"""','""" + lastNameInputText + """', '""" + patientBirthDateEditParse +"""', '""" + ageInputText +"""','"""+ maritalStatusComboBoxText +"""','"""+ occupationInputText +"""','"""+ doctype +"""','"""+ dniNumberInputText +"""','"""+ genreRadioButtonText +"""','"""+ celPhoneInputText +"""','"""+ streetInputText +"""','"""+ cityInputText +"""');""" 

        
        addClinicalStudy = """INSERT INTO clinicalstudiesform (idstudy,idpatient,idstudytype,studydate,adqtime) VALUES (NULL,%s,%s,%s,%s)""" 

        clinicalStudyParameters = (patientId,selectedStuId,studyDate,adqTime)

        print(clinicalStudyParameters)


        try:
            
            #Creación Nuevo Estudio Clínico -
            self.sismsbiCursor.execute(addClinicalStudy,clinicalStudyParameters)
            self.sismsbiDataBase.commit()

            #Obtengo el id del estudio anteriormente creado para el guardado de los datos en las tablas (ECG, Spo2-Fc , Temp)

            idStudyQuery = """SELECT * FROM  clinicalstudiesform ORDER BY idstudy DESC LIMIT 1"""
            self.sismsbiCursor.execute(idStudyQuery)
            
            studyData = self.sismsbiCursor.fetchone()
            self.idStudy = studyData[1] #Obtengo el id del nuevo estudio creado

            print(self.idStudy)
            
            #self.sismsbiCursor.close()
            #print(sismsbiDataBase)
            print("Guardando en base de datos...OK")

        except Error as e:
            print("No se pudo conectar con la base de datos",e)

        
                
        ####################################################################

        #if (selectedStuId==3):
            

            
        self.adqProgressBar = QtWidgets.QProgressDialog("Recolectando Datos!", "Cancelar", 0, 100, self)
        self.adqProgressBar.setWindowTitle("Adquisición")
        self.adqProgressBar.setAutoClose(False)
        self.adqProgressBar.setWindowModality(Qt.WindowModal)
        #adqProgressBar.setMinimumDuration(1000)
        
        self.adqProgressBar.show()
        ##adqProgressBar.forceShow
        self.adqProgressBar.setValue(0)
        self.tProgressBar.start(updateInterval)


    def endAdquisitionMessageBox(self):
        exitMsgBox =   QtGui.QMessageBox(self)
        exitMsgBox.setIcon(QtGui.QMessageBox.Information)
        exitMsgBox.setWindowTitle('Adquisición de Datos')
        exitMsgBox.setText('Datos almacenados correctamente.')
        self.YesExitButton = exitMsgBox.addButton("OK", QtGui.QMessageBox.YesRole)
        #NoExitButton = exitMsgBox.addButton("No", QtGui.QMessageBox.NoRole)
        #print(self.YesExitButton)
        #print(NoExitButton)
        #self.exitMsgBox.buttonClicked.connect(self.YesPressed)
        
        ret = exitMsgBox.exec_()
        if exitMsgBox.clickedButton()==self.YesExitButton:
            print("Extracting Naaaaaaoooww!!!!")
            #exitMsgBox.done(r)
            #client.disconnect()
            #sys.exit()
            

    def closeDataAdqWindow(self):
        #print('close')
        self.sismsbiCursor.close()
        self.close()


#################### Tabla Selección Paciente Para Estudio ##################################

class patientSelectionTableModel(QtCore.QAbstractTableModel):
    def __init__(self, data):
        super(patientSelectionTableModel, self).__init__()
        self._data = data

        
    def data(self, index, role):
        
        column = index.column()
        row = index.row()

        if role == Qt.DisplayRole:
            if column == 0:
                return self._data[row][column]
            if column == 1:
                return self._data[row][column]
            if column == 2:
                return self._data[row][column]
            if column == 3:
                return self._data[row][8]
        elif role == Qt.TextAlignmentRole:
            return Qt.AlignVCenter + Qt.AlignRight
        
            # See below for the nested-list data structure.
            # .row() indexes into the outer list,
            # .column() indexes into the sub-list
            #return self._data[index.row()][index.column()]

    def rowCount(self, index):
        # The length of the outer list.
        return len(self._data)

    def columnCount(self, index):
        # The following takes the first sub-list, and returns
        # the length (only works if all rows are an equal length)
        return 4
    
    def headerData(self, section, orientation, role):
        if role != Qt.DisplayRole:
            return None
        if orientation == Qt.Horizontal:
            return ("ID", "Nombre","Apellido","DNI")[section]
        else:
            return "{}".format(section)


##################### Clase Control Selección de Items ##################################################

#class patientSelection(QtCore.QItemSelectionModel):
#    def __init__(self, *args, **kwargs):
#        super(patientSelection, self).__init__(*args, **kwargs)

    
    
    

#################### Ventana Importar Archivos Shorcut: CRTL + F ############################        

class importFilesWindow(QtWidgets.QMainWindow):

    def __init__(self, *args, **kwargs):
        super(importFilesWindow, self).__init__(*args, **kwargs)
        uic.loadUi('importfileswindow.ui', self)
        self.horizontalScrollBar.setEnabled(False)
        
        ScrollProxyWidget = QGraphicsProxyWidget()
        ScrollProxyWidget.setWidget(self.horizontalScrollBar)
        
        
        self.actionSalir.triggered.connect(self.closeDataBaseWindow) #slots para señales de eventos click en el menu
        self.actionAbrir.triggered.connect(self.searchImportFiles)
        
        self.ecgImportPlot.setTitle(title="Señal cardíaca almacenada")
        self.ecgImportPlot.enableAutoRange(enable=False)
        self.ecgImportPlot.setRange(yRange=[-120, 100])
        self.ecgImportPlot.setRange(xRange=[0, 500])
        self.ecgImportSignalCurve = self.ecgImportPlot.plot(pen='w',clear=True)

    def closeEvent(self,event):
        self.closeDataBaseWindow()

    def closeDataBaseWindow(self):
        #print('close')
        window.importfileswindow.close()

    def searchImportFiles(self):
        #print('search')

        dataImportX=[]
        dataImportY=[]
        
        fileOpenDialog = QtWidgets.QFileDialog(self)  
        #fileOpenDialog.setLabelText('Seleccione Archivo de Datos para Visualizar')
        fileOpenDialog.setDirectory('D:\juan\Proyecto Final\Raw Data')
        fileOpenDialog.setFileMode(QtWidgets.QFileDialog.AnyFile)
        fileOpenDialog.setAcceptMode(QtWidgets.QFileDialog.AcceptOpen)
        fileOpenDialog.setNameFilters(['Text files (*.txt)','CSV files (*.csv)'])
        #filenames = QStringList()
        
        #fileOpenDialog.exec_()
        
        if fileOpenDialog.exec_():
            filePaths = fileOpenDialog.selectedFiles() #Obtenemos la ruta de acceso al archivo que previamente hemos seleccionado
            #print(filePaths)

            if (filePaths):
                openEcgSignalFile = open(filePaths[0], 'r') #Usamos el argumento 'r' para leer 'w' escribir (se borra todo lo anterio) 'a' apprend agregar.
                #print(openEcgSignalFile)	
                
                #with openEcgSignalFile:
                    #EcgSignalTxtDataFull = openEcgSignalFile.read() #Leemos todo el archivo completo
                    #self.ecgDataText.setText(EcgSignalTxtDataFull)  # La muestro en el TextEdit 

                EcgSignalTxtDataArray = openEcgSignalFile.readlines() #Obtengo los datos tel txt en un array
                #print(EcgSignalTxtDataArray[0])
                #print(float(EcgSignalTxtDataArray[0]))
                
                #for x in EcgSignalTxtDataArray:
                #    EcgSignalTxtDataArrayInt =int(x)

                #print(len(EcgSignalTxtDataArray))
                i=0
                while (i<len(EcgSignalTxtDataArray)-1):
                    self.horizontalScrollBar.setEnabled(True)
                    i+=1
                    EcgSignal = float(EcgSignalTxtDataArray[i])
                    #print(EcgSignal)
                    dataImportX.append(i)
                    dataImportY.append(EcgSignal)

             
            
            openEcgSignalFile.close()

            self.ecgImportSignalCurve.setData(dataImportX,dataImportY)
            pg.QtGui.QApplication.processEvents()   

        
#################################################################################
        
class Senales(QDialog):
    def __init__(self, *args, **kwargs):
        super(Senales, self).__init__(*args, **kwargs)
        #self.area_ref = Area_grafico(self)
        #self.area_ref.show()
        #self.area_ref = Area_grafico(self)
        #self.area_ref.show()


############################### Funcion Main ###############################################        
def main():
    app = QApplication([])
    
    #app = QtWidgets.QApplication(sys.argv)
    window = MainWindow()
    window.show()
    
    app.instance().exec_()
    pg.QtGui.QApplication.processEvents()
    
    #sys.exit(app.exec_())


    


if __name__ == '__main__':      

    
    app = QApplication([])
    
    #plotearTest()
    #app = QtWidgets.QApplication(sys.argv)
    window = MainWindow()
    window.show()
    app.instance().exec_()
    pg.QtGui.QApplication.processEvents()
    #sys.exit(app.exec_())
    

    
        
    
    


















