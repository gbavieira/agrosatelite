import re

from django.utils.translation import gettext as _
from rest_framework import serializers


def cpf_validator(value):
    patterns = ["(^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$)", "(^[0-9]{11}$)"]
    for p in patterns:
        if re.match(p, value):
            return
    message = _('Invalid CPF')
    raise serializers.ValidationError(message)
