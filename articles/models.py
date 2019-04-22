from django.db import models
from django.utils import timezone


class Article(models.Model):
    title = models.CharField(max_length=120)
    date = models.DateField(default=timezone.now)
    content = models.TextField()

    def __str__(self):
        return self.title
