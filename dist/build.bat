cd C:\Users\user\WebstormProjects\masseffect_bypass\masseffect_bypass
copy /Y src\css\ output\bypass\hacking\css\
copy /Y src\img\ output\bypass\hacking\img\
copy /Y src\js\config.js output\bypass\hacking\js\
copy /Y src\js\lib\require.js output\bypass\hacking\js\lib\
cd dist
node r.js -o buildconfig.js