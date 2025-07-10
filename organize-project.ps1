
# إنشاء مجلد src إن لم يكن موجود
$srcPath = "src"
if (!(Test-Path -Path $srcPath)) {
    New-Item -ItemType Directory -Path $srcPath | Out-Null
    Write-Host "✅ أنشأنا مجلد src"
} else {
    Write-Host "📁 مجلد src موجود بالفعل"
}

# قائمة المجلدات المطلوب نقلها
$foldersToMove = @("pages", "public", "rina-pwa", "dataconnect", "dataconnect-generated")

foreach ($folder in $foldersToMove) {
    $sourcePath = Join-Path -Path "." -ChildPath $folder
    $destPath = Join-Path -Path $srcPath -ChildPath $folder

    if (!(Test-Path -Path $sourcePath)) {
        Write-Host "⚠️ المجلد '$folder' غير موجود في المسار الحالي"
        continue
    }

    if (Test-Path -Path $destPath) {
        Write-Host "⏭️ تم تخطي '$folder' لأنه موجود مسبقًا في src/"
        continue
    }

    try {
        Move-Item -Path $sourcePath -Destination $srcPath -Force
        Write-Host "✅ تم نقل '$folder' بنجاح إلى src/"
    } catch {
        Write-Host "❌ فشل نقل '$folder': $($_.Exception.Message)"
    }
}

# تعريف المسارات
$rootPages = "pages"
$srcPages = "src/pages"
$srcApi = "src/pages/api"

# تأكد أن src/pages موجود
if (!(Test-Path -Path $srcPages)) {
    New-Item -ItemType Directory -Path $srcPages -Force | Out-Null
    Write-Host "✅ أنشأنا src/pages"
}

# نقل مجلد api إلى src/pages
if (Test-Path "$rootPages/api") {
    if (!(Test-Path $srcApi)) {
        Move-Item "$rootPages/api" $srcPages
        Write-Host "✅ تم نقل مجلد api إلى src/pages"
    } else {
        Write-Host "⏭️ تم تخطي api لأنه موجود بالفعل في src/pages"
    }
}

# نقل الملفات .js و .jsx من pages إلى src/pages
Get-ChildItem -Path $rootPages -File -Include *.js, *.jsx | ForEach-Object {
    $destFile = Join-Path $srcPages $_.Name
    if (!(Test-Path $destFile)) {
        Move-Item $_.FullName -Destination $srcPages
        Write-Host "✅ نقلنا الملف $($_.Name)"
    } else {
        Write-Host "⏭️ تم تخطي الملف $($_.Name) لأنه موجود بالفعل"
    }
}

# التحقق إن كان مجلد pages فارغ بعد النقل إذا نعم نحذفه
if ((Get-ChildItem -Path $rootPages -Recurse | Measure-Object).Count -eq 0) {
    Remove-Item -Path $rootPages -Recurse -Force
    Write-Host "🗑️ تم حذف مجلد pages من الجذر لأنه أصبح فارغًا"
} else {
    Write-Host "📁 مجلد pages ما زال يحتوي على بعض العناصر"
}
