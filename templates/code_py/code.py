
import json
import os
import board
import busio
import time
import board
from adafruit_pyportal import PyPortal
import gc
from digitalio import DigitalInOut
import adafruit_esp32spi.adafruit_esp32spi_socket as socket
from adafruit_esp32spi import adafruit_esp32spi
import adafruit_requests as requests


# Add a secrets.py to your filesystem that has a dictionary called secrets with "ssid" and
# "password" keys with your WiFi credentials. DO NOT share that file or commit it into Git or other
# source control.
# pylint: disable=no-name-in-module,wrong-import-order
try:
    from secrets import secrets
except ImportError:
    print("WiFi secrets are kept in secrets.py, please add them there!")
    raise


PLAN_URL = "{{ host }}/pyportal/plan/u/{{ uuid }}/"
MEDIA_URL = "{{ host }}/media/{}"


# determine the current working directory needed so we know where to find files
cwd = ("/"+__file__).rsplit('/', 1)[0]
pyportal = PyPortal(status_neopixel=board.NEOPIXEL,
                    debug=True,
                    default_bg=cwd+"/blinka.bmp")

pyportal.network.connect()

f = open("/sd/plan.json")
plan_json = json.loads(f.read())
f.close()

local_md5 = plan_json["md5"]
pyportal.set_background("/sd/plan_image.bmp")

while True:
    # great, lets get the data
    print("Retrieving plan...", end='')
    #pyportal.neo_status((100, 100, 0))   # yellow = fetching data
    gc.collect()

    pyportal.wget(url=PLAN_URL, filename="/sd/new_plan.json")
    print("Reply is OK!")
    f = open("/sd/new_plan.json")
    new_plan_json = json.loads(f.read())
    f.close()

    if local_md5 != new_plan_json["md5"]:
        print("downloading image in 3...2...1...")
        time.sleep(3)

        print("Retrieving image...", end='')
        pyportal.wget(url=MEDIA_URL.format(new_plan_json['image']), filename="/sd/new_plan_image.bmp")
        gc.collect()
        #pyportal.neo_status((0, 0, 100))   # green = got data
        print("Reply is OK!")
        local_md5 = new_plan_json["md5"]
        os.rename("/sd/new_plan.json", "/sd/plan.json")
        os.rename("/sd/new_plan_image.bmp", "/sd/plan_image.bmp")


        pyportal.set_background("/sd/plan_image.bmp")
    time.sleep(10)