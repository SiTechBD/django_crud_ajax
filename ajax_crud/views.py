from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from ajax_crud.models import *
import os

# Create your views here.
def home(request):
    return render(request,'ajax_crud/home.html')

def add_data(request):
    if request.method =="POST":
        name = request.POST['name']
        email = request.POST['email']
        image = request.FILES.get('image')
        querySet = Entry.objects.create(name= name, email = email, image = image)
        if querySet:
            return HttpResponse("Data added successfuylly.")
        else:
            return HttpResponse("Something went wrong")

def view_data(request):
    data = Entry.objects.all()
    ent = list(data.values())
    return JsonResponse({'entry':ent})

def edit_data(request,id):
    data = Entry.objects.filter(id = id)
    ent = list(data.values())
    return JsonResponse({'entry':ent})

def update_data(request):
    if request.method == "POST":
        uid = request.POST['u_id']
        name = request.POST['name']
        email = request.POST['email']
        newimage = request.FILES.get('image')
        getEntry = Entry.objects.get(id = uid)
        oldImage = getEntry.image
        if newimage:
            os.remove(oldImage.path)
            getEntry.image = newimage
            getEntry.save()
        getEntry.name = name
        getEntry.email = email 
        getEntry.save()
        return HttpResponse("Data updated successfully.")


def delete_data(request):
    if request.method =="POST":
        getId = request.POST['delete_id']
        data = Entry.objects.get(id = getId)
        os.remove(data.image.path)
        data.delete()
        return HttpResponse("Data deleted successfully.")
    


def search_data(request):
    if request.method == "GET":
        key = request.GET['keyword']
        query = Entry.objects.filter(name__contains = key)
        queryData = list(query.values())
        return JsonResponse({'entry':queryData})