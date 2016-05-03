# The Creativo PTY Web Site

This is the code that powers the [Creativo PTY website][site].

VersionEye: [![Dependency Status](https://www.versioneye.com/user/projects/57180f06fcd19a0051855f82/badge.svg?style=flat)][versioneye]

## First Time

Follow these instructions to view the web site for the first time from your
computer. If you have already cloned a repository from GitHub before, you can
**skip to step \#4**. If you have already used Node.js before, then you can
**skip to step \#5**.

1.  **Find your Command Line Interface (CLI)**: You can read
[this page][setup-console] to learn how to start your CLI console. You will need
this to run the commands for the following steps.

2.  **Install Git**: Once you have the CLI console open, check if you have
[Git][git] installed by running `git --version`. If anything but the version of
Git appeared, then you will need [to install it][install-git]. Once the process
is over, you can again check if you have Git running by entering `git --version`
in the CLI console. If you are new to Git, you can read [this guide][git-guide]
or you can [follow this fifteen minute tutorial][git-tutorial].

3.  **Clone this Repository**: You can follow [this guide][clone-repository] to
learn how to clone a repository from GitHub. In the CLI console, move the
current working directory to where you want to clone this repository to. You can
check the command required to do this in [the guide][setup-console] about
setting up the console from before.

4.  **Install Node.js and NPM**: First, check if you have [Node.js][node]
installed by running `node -v` in the CLI console. If anything but the version
of Node appeared, then you can follow [these instructions][install-node] to
install it. Once the process is over, you can again check if you have Node
running by entering `node -v` in the CLI console. Those same instructions show
that Node comes with [the Node Package Manager (NPM)][npm]. We will be using
this to manage the application packages.

5.  **Install the NPM Packages**: In the CLI console, move to inside the
repository you cloned earlier \(either _creativo-pty-website_ or another name
you chose\) and run `npm install`. This will create a local environment to
download the Node modules needed to build the web site.

6.  **Run a Local Server to see the Site**: In the CLI console, run `gulp`. This
command will grab all of the source files in the _app_ folder, convert them into
the web site, and store the resulting files in the _dist_ folder. In a moment,
your browser should open with the web site in view. If you change any file in
the _app_ folder, the application will automatically update the corresponding
file in the _dist_ folder and update your view of the web site in the browser.

For any questions or comments, you can create a [new issue][new-issue] or head
over to the [issue tab][issue] to view open and closed issues.

[site]: http://creativopty.com "Creativo PTY"
[versioneye]: https://www.versioneye.com/user/projects/57180f06fcd19a0051855f82 "VersionEye"
[setup-console]: http://cli.learncodethehardway.org/book/ex1.html "The Command Line Crash Course"
[git]: https://git-scm.com/ "Git: Free, Open Source, Distributed VCS"
[install-git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git "Installing Git"
[git-guide]: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control "Getting Started with Git"
[git-tutorial]: https://try.github.io/levels/1/challenges/1 "Try Git at Code School"
[clone-repository]: https://help.github.com/articles/cloning-a-repository/ "Cloning a Repository"
[node]: https://nodejs.org/ "Node.js"
[install-node]: https://docs.npmjs.com/getting-started/installing-node "Installing Node"
[npm]: https://www.npmjs.com/ "Node Package Manager"
[new-issue]: https://github.com/creativo-pty/creativo-pty-website/issues/new "New Issues"
[issue]: https://github.com/creativo-pty/creativo-pty-website/issues "Issues"
