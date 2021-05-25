from django.contrib import admin

# Register your models here.
from backend.models import Design

class PlanAdmin(admin.ModelAdmin):
    readonly_fields = ["uuid"]



admin.site.register(Design, PlanAdmin)