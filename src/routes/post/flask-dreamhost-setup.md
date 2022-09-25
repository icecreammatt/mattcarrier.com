---
title: Setting up and deploying Python Flask to Dreamhost
date: 2013-03-04
aliases:
  - /flask-dreamhost-setup/
tags:
  - 'python'
---

I have a few applications I have written that run on <a title="Flask" href="http://flask.pocoo.org" target="_blank">Flask</a>. Every time I would go to deploy a new application I would always seem to forget one of the minor details and end up with the ugly <code>An error occurred importing your passenger_wsgi.py</code>

<!--more-->

The following are the steps I use to deploy Flask to Dreamhost using Passenger. I haven't tested it, but this should be roughly the same steps if you want to deploy directly to your domain instead of using a subdomain.

<h2>TL;DR; (Quick Setup)</h2>
<ul>
	<li>add a new subdomain on the dreamhost web panel</li>
	<li>cd myappname.domain.com</li>
	<li>git clone https://github.com/icecreammatt/flask-passenger.git .</li>
	<li>virtualenv .</li>
	<li>. bin/activate</li>
	<li>easy_install flask</li>
	<li>git submodule init</li>
	<li>git submodule update</li>
	<li>Replace <code>myappname.domain.com</code> in passenger_wsgi.py with your folder path.</li>
	<li>touch tmp/restart.txt</li>
	<li>DONE!</li>
</ul>
<h2>Part 1 - Setup Domain</h2>
<ul>
	<li>Go to <em>Manage Domains</em> after logging into the Web Panel</li>
	<li>Add New Domain / Sub-Domain
<ul>
	<li><strong>Domain to host:</strong> I like to use subdomains a lot of testing and the different Flask apps I run, so I tend to use <code>myappname.domain.com</code> Obviously swap out myappname.domain.com with your own names.</li>
	<li>(Optional) Check remove WWW</li>
	<li>If you have more than one user account make sure to pick the correct one.</li>
	<li>Web directory should fill out automatically for you</li>
	<li><strong>Passenger (Ruby/Python apps only):</strong> Check this box</li>
</ul>
</li>
	<li>Fully host this domain!</li>
	<li>SSH into your web server and wait a minute or two for the myappname.domain.com folder to appear</li>
	<li>cd into myappname.domain.com</li>
</ul>
<h2>Part 2 - Install Flask with Passenger</h2>
<h3>1. Setup a virtualenv</h3>
First we need to setup the virtual environment
<pre name="code" class="shell">$ virtualenv .
$ ls</pre>
You should now have a directory that looks something like this:
<pre name="code" class="shell">bin     
include  
lib 
public</pre>
Next activate the virtual environment by using
<pre name="code" class="shell">$ . bin/activate</pre>
The command line should now show up something like this:
<pre name="code" class="shell">(myappname.domain.com)myappname.domain.com $</pre>
<h3>2. Install Flask</h3>
<pre name="code" class="shell">$ easy_install flask</pre>
<h3>3. Setup passenger</h3>
Create a file named passenger_wsgi.py with the following:
<h4>NOTE: Make sure to hand type this, as pasting the tabbed lines from the browser can translate to spaces which will evaluate incorrectly.</h4>

```python
<pre name="code" class="python">import sys, os
INTERP = os.path.join(os.environ[&#039;HOME&#039;], &#039;myappname.domain.com&#039;, &#039;bin&#039;, &#039;python&#039;)
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)
sys.path.append(os.getcwd())

from flask import Flask
`application = Flask(__name__)`

@application.route(&#039;/&#039;)
def index():
return &#039;Hello Passenger&#039;</pre>
<strong>NOTE:</strong> Don't forget to change myappname.domain.com to match the setup you are using.

<h3>4. Start the server</h3>
Add a folder called <code>tmp</code> with a file named <code>restart.txt</code>
```

```bash
<pre name="code" class="shell">$ mkdir tmp
$ touch tmp/restart.txt</pre>
To restart the Flask application after making changes you need to update the restart.txt file. This can easily achieved by doing a touch tmp/restart.
<em>(For my projects I add a post-receive hook into my git repo to touch the file for me).</em>

The directory should now look something like this:

<pre name="code" class="shell">bin

include
lib
passenger_wsgi.py
public
tmp</pre>
```

<h3>5. Test</h3>
At this point you should be able to hit the server address <code>mynameapp.domain.com</code> from the browser and see 'Hello passenger'
<h2>Part 3 - Deploying a real app</h2>
<h3>1. Clone sample project from github <a href="https://github.com/icecreammatt/flask-empty.git">https://github.com/icecreammatt/flask-empty.git</a></h3>
<pre name="code" class="shell">$ pwd
/home/username/myappname.domain.com
$ git clone https://github.com/icecreammatt/flask-empty.git myappname</pre>
```

<h3>1. Adjust passenger_wsgi.py</h3>
Now that the basic stuff is in place a real application can be setup.

Edit <code>passenger_wsgi.py</code> so it now contains

<pre name="code" class="python">import sys, os
INTERP = os.path.join(os.environ[&#039;HOME&#039;], &#039;myappname.domain.com&#039;, &#039;bin&#039;, &#039;python&#039;)
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)
sys.path.append(os.getcwd())

sys.path.append(&#039;myappname&#039;)
from myappname.app import app as application</pre>

_**Note:** Make sure if you copy this to tab os.excl... since it will copy as spaces and cause a runtime error._

Restart Flask

<pre name="code" class="shell">$ touch tmp/restart.txt</pre>
<h2>Other Resources:</h2>
I am by no means an expert at Python or Flask, I just like to code in it during my free time. Feel free to correct me on my style of code. Please post any questions or comments.
<ul>
	<li><a href="http://wiki.dreamhost.com/Flask">http://wiki.dreamhost.com/Flask</a></li>
</ul>
