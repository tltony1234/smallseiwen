$ git init
Initialized empty Git repository in /private/tmp/practice-git/.git/

$ git add README.md

$ git commit -m "first commit"
[master (root-commit) adc1a5a] first commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
 
 $ git remote add origin git@github.com:kaochenlong/practice-git.git
 
 $ git push -u origin master
Counting objects: 3, done.
Writing objects: 100% (3/3), 228 bytes | 228.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To github.com:kaochenlong/practice-git.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.
