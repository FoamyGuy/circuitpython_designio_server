# Designio

Designio allows you to create designs and POST them to adafruit.io in order to show them on a waiting CircuitPython device.
 
# Usage

Designio is currently optimized for the FunHouse device. The code.py below is made to work with FunHouse and the default design size is 240x240 to match the screen.

### boot.py

The code.py assumes the CIRCUITPY drive is mounted as writeable for the code (and not for the PC).

```python
"""CircuitPython Essentials Storage logging boot.py file"""
import board
import digitalio
import storage

switch = digitalio.DigitalInOut(board.BUTTON_UP)

switch.direction = digitalio.Direction.INPUT
switch.pull = digitalio.Pull.DOWN

print("UP btn val: {}".format(switch.value))

# If the switch pin is connected to ground CircuitPython can write to the drive
storage.remount("/", switch.value)
```

This boot.py file will read the value of the UP button pin and make the drive writable to PC if the button is pressed during bootup.

### code.py

You'll need to also add a `secrets.py` file on your device with WIFI network credentials as well as Adafruit.io keys

```python
# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT
import time
from random import randint
import board
import ssl
import socketpool
import wifi
import gc
import adafruit_minimqtt.adafruit_minimqtt as MQTT
from adafruit_io.adafruit_io import IO_MQTT
import json
import adafruit_requests as requests
import os
import displayio

from displayio import Group, OnDiskBitmap

SIGNATURE_FEED = "designio.image-signature"


### WiFi ###

# Add a secrets.py to your filesystem that has a dictionary called secrets with "ssid" and
# "password" keys with your WiFi credentials. DO NOT share that file or commit it into Git or other
# source control.
# pylint: disable=no-name-in-module,wrong-import-order
try:
    from secrets import secrets
except ImportError:
    print("WiFi secrets are kept in secrets.py, please add them there!")
    raise

# Set your Adafruit IO Username and Key in secrets.py
# (visit io.adafruit.com if you need to create an account,
# or if you need your Adafruit IO key.)
aio_username = secrets["aio_username"]
aio_key = secrets["aio_key"]

print("Connecting to %s" % secrets["ssid"])
wifi.radio.connect(secrets["ssid"], secrets["password"])
print("Connected to %s!" % secrets["ssid"])



# Define callback functions which will be called when certain events happen.
# pylint: disable=unused-argument
def connected(client):
    # Connected function will be called when the client is connected to Adafruit IO.
    # This is a good place to subscribe to feed changes.  The client parameter
    # passed to this function is the Adafruit IO MQTT client so you can make
    # calls against it easily.
    print("Connected to Adafruit IO!  Listening for DemoFeed changes...")
    # Subscribe to changes on a feed named DemoFeed.
    client.subscribe(SIGNATURE_FEED)


def subscribe(client, userdata, topic, granted_qos):
    # This method is called when the client subscribes to a new feed.
    print("Subscribed to {0} with QOS level {1}".format(topic, granted_qos))


def unsubscribe(client, userdata, topic, pid):
    # This method is called when the client unsubscribes from a feed.
    print("Unsubscribed from {0} with PID {1}".format(topic, pid))


# pylint: disable=unused-argument
def disconnected(client):
    # Disconnected function will be called when the client disconnects.
    print("Disconnected from Adafruit IO!")


# pylint: disable=unused-argument
def message(client, feed_id, payload):
    # Message function will be called when a subscribed feed has a new value.
    # The feed_id parameter identifies the feed, and the payload parameter has
    # the new value.
    #print("Feed {0} received new value".format(feed_id))
    print("Feed {0} received new value: {1}".format(feed_id, payload))
    payload_obj = json.loads(payload)
    print(payload_obj['url'])
    f = open("/new_plan.json", "w")
    f.write(payload)
    f.close()
    f = open("/new_plan.json")
    new_plan_json = json.loads(f.read())
    f.close()
    if local_md5 != new_plan_json["md5"]:
        print("downloading image")
        image_response = https.get(new_plan_json['url'])
        f = open("plan_image.bmp", "wb")
        f.write(image_response.content)
        f.close()
        print("download complete")
        gc.collect()
        print("update background")
        set_background("plan_image.bmp")

def set_background(image_file):
    if image_file in os.listdir("/"):
        print("requested background exists")
        try:
            bitmap_file = open("/{}".format(image_file), "rb")
            odb = displayio.OnDiskBitmap(bitmap_file)

            #bitmap, palette = adafruit_imageload.load("/{}".format(image_file),
            #                                 bitmap=displayio.Bitmap,
            #                                 palette=displayio.Palette)

            # Create a TileGrid to hold the bitmap
            tile_grid = displayio.TileGrid(odb, pixel_shader=displayio.ColorConverter())
            while len(main_group) > 0:
                main_group.pop(0)
            main_group.append(tile_grid)
        except ValueError as e:
            print(e)


main_group = Group()
board.DISPLAY.show(main_group)

local_md5 = ""
if "plan.json" in os.listdir("/"):
    f = open("/plan.json")
    plan_json = json.loads(f.read())
    f.close()

    local_md5 = plan_json["md5"]
    set_background("plan_image.bmp")

if "plan_image.bmp" in os.listdir("/"):
    set_background("plan_image.bmp")


# Create a socket pool
pool = socketpool.SocketPool(wifi.radio)
https = requests.Session(pool, ssl.create_default_context())


# Initialize a new MQTT Client object
mqtt_client = MQTT.MQTT(
    broker="io.adafruit.com",
    username=secrets["aio_username"],
    password=secrets["aio_key"],
    socket_pool=pool,
    ssl_context=ssl.create_default_context(),
)

# Initialize an Adafruit IO MQTT Client
io = IO_MQTT(mqtt_client)

# Connect the callback methods defined above to Adafruit IO
io.on_connect = connected
io.on_disconnect = disconnected
io.on_subscribe = subscribe
io.on_unsubscribe = unsubscribe
io.on_message = message

# Connect to Adafruit IO
print("Connecting to Adafruit IO...")
io.connect()



# Below is an example of manually publishing a new  value to Adafruit IO.
last = 0
print("Listening for messages on image-signature feed...")
while True:
    # Explicitly pump the message loop.
    io.loop()
    time.sleep(0.5)
```

More docs to come...