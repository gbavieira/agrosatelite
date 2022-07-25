from django.contrib.gis.db import models
from django.utils.translation import gettext as _


class Owner(models.Model):
    CPF = "CPF"
    CNPJ = "CNPJ"

    DOCUMENT_TYPE_CHOICES = (
        (CPF, "CPF"),
        (CNPJ, "CNPJ"),
    )

    name = models.CharField(verbose_name=_("Name"),
                            max_length=255)

    document = models.CharField(verbose_name=_("Document"),
                                max_length=255)

    document_type = models.CharField(verbose_name=_("Document type"),
                                     max_length=10,
                                     choices=DOCUMENT_TYPE_CHOICES)

    creation_date = models.DateTimeField(verbose_name=_("Creation date"),
                                         auto_now_add=True, editable=False)

    last_modification_date = models.DateTimeField(
        verbose_name=_("Last modification date"), auto_now=True)

    is_active = models.BooleanField(verbose_name=_("Is Active"), default=True)

    def __str__(self):
        return str(self.name)

    def get_class_name(self):
        return "owner"

    class Meta:
        unique_together = ['document', 'document_type']
        ordering = ['id']
        verbose_name = _('Owner')
        verbose_name_plural = _('Owners')
