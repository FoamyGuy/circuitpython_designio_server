from django.contrib.auth.models import User
from django.db import models
import uuid

# Create your models here.
from django.db.models import CASCADE
from django.urls import reverse


class Design(models.Model):
    name = models.CharField(max_length=128)
    content_image = models.FileField(upload_to="content", blank=True, default='')
    content_json = models.JSONField(blank=True, default=dict)

    user = models.ForeignKey(User, on_delete=CASCADE, null=True, blank=True)

    uuid = models.UUIDField(default=uuid.uuid4, editable=False)

    aio_webhook_image = models.CharField("image webhook", max_length=128, blank=True, null=True)
    aio_webhook_signature = models.CharField("signature webhook", max_length=128, blank=True, null=True)

    @property
    def view_url(self):
        return reverse("frontend:design_uuid", kwargs={"design_uuid": self.uuid})

    def __str__(self):
        if self.user:
            return "{} - {}".format(self.user.username, self.name)
        else:
            return self.name


class UserDefaultWebhooks(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    image_webhook_url = models.CharField("Image Webhook", max_length=128, blank=True, null=True)
    signature_webhook_url = models.CharField("Signature Webhook", max_length=128, blank=True, null=True)

    def __str__(self):
        return self.user.username
