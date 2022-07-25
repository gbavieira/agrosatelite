"""farm_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import RedirectView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Farm Project API",
        default_version='v1',
        description="A Test Project for new Agrosatelite Developers",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="webmaster@agrosatelite.com.br"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/', include(('farm_base.api.v1.urls',
                             'farm_base'),
                            namespace='farm_base')),
]

if settings.DEBUG:
    urlpatterns += [
        path('', RedirectView.as_view(url="/api/v1")),

        # swagger view
        re_path(r'^api/v1(?P<format>\.json|\.yaml)$',
                schema_view.without_ui(cache_timeout=0), name='schema-json'),
        re_path(r'^api/v1/$', schema_view.with_ui('swagger', cache_timeout=0),
                name='schema-swagger-ui'),
    ]
