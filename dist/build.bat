cd C:\Users\user\WebstormProjects\mbpass\
copy /Y src\css\ output\bypass\hacking\css\

copy /Y src\img\buttons\ output\bypass\hacking\img\buttons\
copy /Y src\img\merged\ output\bypass\hacking\img\merged\

copy /Y src\js\config.js output\bypass\hacking\js\
copy /Y src\js\lib\require.js output\bypass\hacking\js\lib\

copy /Y src\base.html output\bypass\hacking\index.html

cd dist
node r.js -o buildconfig.js