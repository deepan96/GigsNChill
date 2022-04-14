"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include, re_path
from login import views
from rest_framework import routers
from register import views as view_register
from event import views as view_event

# Maps LoginCls ViewSet to ~/api/login
"""router = routers.DefaultRouter()
router.register(r'login', views.LoginClsView, 'login')
router.register(r'register', view_register.RegisterView.as_view(), 'register')"""

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.LoginClsView.as_view(), name='login'),  # put router urls at ~/api
    path('register/', view_register.RegisterView.as_view(), name="register"),
    path('recoverpassword/', view_register.RecoverPasswordView.as_view(), name="recover-password"),
    path('resetpassword/', view_register.ResetPasswordView.as_view(), name="reset-password"),
    path('updatepassword/', view_register.UpdatePasswordView.as_view(), name="update-password"),
    re_path('viewprofile/(?P<Type>[\w-]+)/(?P<Email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$',
            view_register.ProfileView.as_view(), name="view-profile"),
    re_path('viewprofile/(?P<Email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$',
            view_register.ProfileView.as_view(), name="view-profile"),
    # re_path('viewprofile/\w+|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/', view_register.ProfileView.as_view(), name="viewprofile"),
    path('addnewevent/', view_event.AddNewEventView.as_view(), name="add-new-event"),
    path('searchevent/', view_event.SearchEvents.as_view(), name="search-event"),
    path('bookevent/', view_event.BookEventView.as_view(), name="book-event"),
    path('bookmarkevent/', view_event.BookmarkEventView.as_view(), name="new-bookmark"),
    #re_path('invitefriends/(?P<Type>[\w-]+)/(?P<Email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$',
    #        view_event.InviteFriendsView.as_view(), name="invite-friends"),
    #re_path('invitefriends/(?P<Email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$',
    #        view_event.InviteFriendsView.as_view(), name="invite-friends"),'''
    re_path('bookmarks/(?P<Email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$',
            view_event.BookmarkEventView.as_view(), name="bookmarks"),
    path('invitefriends/', view_event.InviteFriendsView.as_view(), name="invite-friends"),
    # path('invitefriends/', view_event.InviteFriendsView.as_view(), name="invite-friends"),
    # path(r'^profile/\w+|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/', view_register.ProfileView.as_view(), name="profile"),
]
