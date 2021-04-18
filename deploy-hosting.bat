@echo off
ionic build --prod
firebase deploy --only "hosting"