#Created the farm.py to create the filters for the search fields.

from django_filters import FilterSet

from farm_base.api.v1.filters.fields import NumberInFilter,CharFilter
from farm_base.models import Farm



class FarmFilter(FilterSet):
    ids = NumberInFilter(field_name='id', lookup_expr='in')
    owner_document = CharFilter(field_name='farm_owner__document', lookup_expr='icontains')

    class Meta:
        model = Farm
        fields = ['ids','name','farm_owner__name', 
                   'state','municipality']