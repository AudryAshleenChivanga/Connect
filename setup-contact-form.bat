@echo off
echo ===========================================
echo Ashletech Connect SRHR - Contact Form Setup
echo ===========================================
echo.

echo This script will help you set up the contact form to send emails to your Gmail.
echo.

echo Choose your deployment platform:
echo.

echo 1. Formspree (works with any hosting)
echo 2. Netlify Forms (only if deploying to Netlify)
echo 3. Exit
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto formspree
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto exit

echo Invalid choice. Please run the script again.
pause
exit /b

:formspree
echo.
echo ===========================================
echo FORMSPREE SETUP
echo ===========================================
echo.
echo Step 1: Go to https://formspree.io
echo Step 2: Sign up with ashletechconnectsrhr@gmail.com
echo Step 3: Create a new form
echo Step 4: Copy your Form ID (looks like: xeqwryzl)
echo.
set /p formid="Enter your Formspree Form ID: "

if "%formid%"=="" (
    echo Form ID cannot be empty.
    pause
    exit /b
)

echo.
echo Updating index.html with your Formspree Form ID...
powershell -Command "(Get-Content index.html) -replace 'YOUR_FORM_ID', '%formid%' | Set-Content index.html"

echo.
echo ✅ Contact form configured for Formspree!
echo.
echo Next steps:
echo 1. Upload your files to your hosting platform
echo 2. Test the contact form
echo 3. Check ashletechconnectsrhr@gmail.com for submissions
echo.
echo Setup guide: FORMSPREE-SETUP.md
echo.
goto end

:netlify
echo.
echo ===========================================
echo NETLIFY FORMS SETUP
echo ===========================================
echo.
echo This will configure your form for Netlify Forms.
echo Make sure you're deploying to Netlify.
echo.

set /p confirm="Are you deploying to Netlify? (y/n): "
if /i not "%confirm%"=="y" goto formspree

echo.
echo Updating index.html for Netlify Forms...
powershell -Command "(Get-Content index.html) -replace 'action=\"https://formspree.io/f/YOUR_FORM_ID\" method=\"POST\"', 'name=\"contact\" method=\"POST\" data-netlify=\"true\" data-netlify-honeypot=\"bot-field\"' | Set-Content index.html"

echo Adding honeypot field for spam protection...
powershell -Command "$content = Get-Content index.html; $newContent = $content -replace '(\<form id=\"contactForm\".*?\>)', '$1`n`t`t`t<!-- Hidden field for spam protection -->`n`t`t`t<div style=\"display: none;\">`n`t`t`t`t<label>Don''t fill this out if you''re human: <input name=\"bot-field\" /></label>`n`t`t`t</div>'; Set-Content index.html $newContent"

echo Removing Formspree-specific hidden fields...
powershell -Command "$content = Get-Content index.html; $content = $content -replace '(?s)<input type=\"hidden\" name=\"_subject\".*?/>', ''; $content = $content -replace '(?s)<input type=\"hidden\" name=\"_next\".*?/>', ''; $content = $content -replace '(?s)<input type=\"hidden\" name=\"_captcha\".*?/>', ''; Set-Content index.html $content"

echo.
echo ✅ Contact form configured for Netlify Forms!
echo.
echo Next steps:
echo 1. Deploy to Netlify
echo 2. Test the contact form
echo 3. Check your Netlify dashboard for submissions
echo 4. Configure email notifications in Netlify
echo.
echo Setup guide: NETLIFY-FORMS-SETUP.md
echo.
goto end

:exit
echo Setup cancelled.
goto end

:end
echo.
echo ===========================================
echo Setup Complete!
echo ===========================================
echo.
echo Your contact form is now configured to send emails to:
echo ashletechconnectsrhr@gmail.com
echo.
echo Don't forget to:
echo - Test the form on your live website
echo - Check your email for submissions
echo - Set up any additional notifications
echo.
echo Happy connecting! 📧✨
echo.
pause
