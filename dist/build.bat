cd C:\Users\user\WebstormProjects\mbpass\
copy /Y src\css\ output\bypass\hacking\css\

copy /Y src\img\ output\bypass\hacking\img\
copy /Y src\img\buttons\ output\bypass\hacking\img\buttons\
copy /Y src\img\codes\ output\bypass\hacking\img\codes\
copy /Y src\img\inform_message\ output\bypass\hacking\img\inform_message\
copy /Y src\img\messages\ output\bypass\hacking\img\messages\
copy /Y src\img\shots\ output\bypass\hacking\img\shots\

copy /Y src\js\config.js output\bypass\hacking\js\
copy /Y src\js\lib\require.js output\bypass\hacking\js\lib\

copy /Y src\base.html output\bypass\hacking\index.html

cd dist
node r.js -o buildconfig.js