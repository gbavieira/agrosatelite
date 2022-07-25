from django_filters import FilterSet, filters

from farm_base.api.v1.filters.fields import NumberInFilter
from farm_base.models import Owner


class OwnerFilter(FilterSet):
    ids = NumberInFilter(field_name='id', lookup_expr='in')

    class Meta:
        model = Owner
        fields = ['ids', 'name', 'document', 'document_type']
