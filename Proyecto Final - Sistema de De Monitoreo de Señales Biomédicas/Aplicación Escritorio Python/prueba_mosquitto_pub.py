import paho.mqtt.client as mqtt
import time
import random
def ecg_emu():
    senal=""
    for x in range(29):
        senal+=str(random.randint(0,1024)).zfill(4)
    return senal
broker_url="192.168.0.222"
broker_port=1883

client = mqtt.Client()
client.connect(broker_url,broker_port)

client.loop_start()

for x in range(1000):
    #client.publish(topic="cardio",payload=ecg_emu(),qos=1,retain=False)
    if not x%4==0:
        message=ecg_emu()
        print(message)
        print(len(message))
        client.publish(topic="esp_1/pote1",payload=message,qos=1,retain=False)
    else:
        message=ecg_emu()+str(random.randint(0,60)).zfill(4)
        print(message)
        print(len(message))
        client.publish(topic="esp_1/pote1",payload=message,qos=1,retain=False)
    time.sleep(.1)
