#!/bin/bash

# GitHub Repository Setup Script
# Bu script, projeyi GitHub'a push etmek için gerekli komutları içerir.

# Kullanım:
# 1. GitHub'da yeni bir repo oluştur: https://github.com/new
#    Repo adı: zugurdun-cenesi
#    Açıklama: Parayı yaz, çeneyi çalıştır - Satın alma gücü hesaplayıcı
#    Public veya Private seç
#    README, .gitignore, license EKLEME (zaten var)
#
# 2. Repo oluşturduktan sonra, GitHub kullanıcı adını aşağıya yaz:

GITHUB_USERNAME="BURAYA_GITHUB_KULLANICI_ADINI_YAZ"
REPO_NAME="zugurdun-cenesi"

# Remote ekle
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# Main branch'e geç (eğer master ise)
git branch -M main

# Push et
git push -u origin main

echo "✅ Proje GitHub'a başarıyla push edildi!"
echo "🔗 Repo URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
