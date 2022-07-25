from django.contrib.gis.db import models
from django.utils.translation import gettext as _
from farm_base.models import Owner #Import to create a relation between Farm and Owner


class Farm(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=255,
                            null=False, blank=False) #blank=false makes the field required

    geometry = models.GeometryField(verbose_name=_("Geometry"),
                                    null=True, blank=True)

    area = models.FloatField(verbose_name=_("Area"),
                             blank=True, null=True)

    centroid = models.PointField(verbose_name=_("Centroid"),
                                 blank=True, null=True)

    creation_date = models.DateTimeField(verbose_name=_("Creation date"),
                                         auto_now_add=True, editable=False)

    last_modification_date = models.DateTimeField(
        verbose_name=_("Last modification date"), auto_now=True)

    is_active = models.BooleanField(verbose_name=_("Is Active"), default=True)

    #Adding fields as requested in Readme 1.
    state = models.CharField(verbose_name=_("State"), max_length=255,
                             null=False, blank=False) # Adding State field to database and making it required

    municipality = models.CharField(verbose_name=_("Municipality"), max_length=255,
                                    null=False, blank=False)      # Adding Municipality field to database
                                                                  # and making it required

    farm_owner = models.ForeignKey(Owner,verbose_name=_("Farm Owner"), on_delete=models.CASCADE,
                                  blank=False, null=False)
    
    # Adding a relation between Farm and Owner. 
    # CASCADE value is given to on_delete so we prevent a farm to have no Owner if one is excluded from database.
                                

    def __str__(self):
        return str(self.name)

    class Meta:
        ordering = ['id']
        verbose_name = _('Farm')
        verbose_name_plural = _('Farms')
        
