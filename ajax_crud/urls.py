from django.urls import path
from ajax_crud.views import *

urlpatterns = [
   path('',home, name='home'),
   path('add_data',add_data, name='add'),
   path('view_data',view_data, name='view'),
   path('delete_data',delete_data, name='delete'),
   path('edit_data/<id>',edit_data, name='edit'),
   path('update_data',update_data, name='update'),
   path('search_data',search_data, name='search'),
]