# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'D:\Juan\Proyecto Final\Aplicación ECG GUI Versión Final\mainwindow.ui'
#
# Created by: PyQt5 UI code generator 5.14.2
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(603, 400)
        MainWindow.setMinimumSize(QtCore.QSize(200, 100))
        MainWindow.setMaximumSize(QtCore.QSize(800, 600))
        MainWindow.setSizeIncrement(QtCore.QSize(5, 5))
        MainWindow.setMouseTracking(True)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap("D:\\Juan\\Proyecto Final\\Aplicación ECG GUI Versión Final\\heart_icon.png"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        MainWindow.setWindowIcon(icon)
        MainWindow.setWindowOpacity(1.0)
        MainWindow.setAnimated(False)
        MainWindow.setDocumentMode(False)
        MainWindow.setTabShape(QtWidgets.QTabWidget.Rounded)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.connect_mqtt = QtWidgets.QPushButton(self.centralwidget)
        self.connect_mqtt.setGeometry(QtCore.QRect(70, 60, 75, 23))
        self.connect_mqtt.setObjectName("connect_mqtt")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(30, 30, 221, 16))
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(270, 30, 101, 16))
        self.label_2.setObjectName("label_2")
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        self.label_3.setGeometry(QtCore.QRect(270, 60, 81, 16))
        self.label_3.setObjectName("label_3")
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 603, 26))
        self.menubar.setObjectName("menubar")
        self.menuArchivo = QtWidgets.QMenu(self.menubar)
        self.menuArchivo.setObjectName("menuArchivo")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)
        self.actionVer_signal = QtWidgets.QAction(MainWindow)
        self.actionVer_signal.setShortcutContext(QtCore.Qt.WindowShortcut)
        self.actionVer_signal.setObjectName("actionVer_signal")
        self.actionSalir = QtWidgets.QAction(MainWindow)
        self.actionSalir.setObjectName("actionSalir")
        self.actionImportar_Archivos = QtWidgets.QAction(MainWindow)
        self.actionImportar_Archivos.setObjectName("actionImportar_Archivos")
        self.actionRegistro_de_Datos = QtWidgets.QAction(MainWindow)
        self.actionRegistro_de_Datos.setObjectName("actionRegistro_de_Datos")
        self.menuArchivo.addAction(self.actionVer_signal)
        self.menuArchivo.addAction(self.actionImportar_Archivos)
        self.menuArchivo.addAction(self.actionRegistro_de_Datos)
        self.menuArchivo.addAction(self.actionSalir)
        self.menubar.addAction(self.menuArchivo.menuAction())

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "Sistema de Monitoreo Señales Biomédicas"))
        MainWindow.setToolTip(_translate("MainWindow", "Pantalla principal"))
        self.connect_mqtt.setStatusTip(_translate("MainWindow", "Conectar con Servidor MQTT"))
        self.connect_mqtt.setText(_translate("MainWindow", "Conectar "))
        self.label.setText(_translate("MainWindow", "Realizar conexión con Servidor MQTT"))
        self.label_2.setText(_translate("MainWindow", "Estado conexión"))
        self.label_3.setText(_translate("MainWindow", "No conectado"))
        self.menuArchivo.setTitle(_translate("MainWindow", "Archivo"))
        self.actionVer_signal.setText(_translate("MainWindow", "Visualización señales"))
        self.actionVer_signal.setToolTip(_translate("MainWindow", "Visualización variables"))
        self.actionVer_signal.setStatusTip(_translate("MainWindow", "Comenzar a recibir información para la visualización de las señales"))
        self.actionVer_signal.setShortcut(_translate("MainWindow", "Ctrl+T"))
        self.actionSalir.setText(_translate("MainWindow", "Salir"))
        self.actionSalir.setStatusTip(_translate("MainWindow", "Salir de la aplicación"))
        self.actionSalir.setShortcut(_translate("MainWindow", "Ctrl+Q"))
        self.actionImportar_Archivos.setText(_translate("MainWindow", "Importar Archivos"))
        self.actionImportar_Archivos.setShortcut(_translate("MainWindow", "Ctrl+F"))
        self.actionRegistro_de_Datos.setText(_translate("MainWindow", "Registro de Datos"))
        self.actionRegistro_de_Datos.setShortcut(_translate("MainWindow", "Ctrl+R"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
