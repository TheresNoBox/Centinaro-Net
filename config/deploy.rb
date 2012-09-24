set :application, "CentinaroNet"
set :repository,  "git@gitweb.theresnobox.net:centinaro-net.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

set :user, "deploy"
set :ssh_options, {:forward_agent => true}

set :deploy_to, "/opt/centinaroNet"

role :web, "198.101.243.95"                          # Your HTTP server, Apache/etc
role :app, "198.101.243.95"                          # This may be the same as your `Web` server

# if you want to clean up old releases on each deploy uncomment this:
#after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do

before "deploy", "deploy:stopNode"
after "deploy", "deploy:startNode"


namespace :deploy do
  task :startNode, :roles => :app do
    run "cd #{current_path} && npm install"
    run "cd #{current_path} && export PORT=80 && node app.js > /dev/null & echo 'Success'"
  end
  task :stopNode, :roles => :app do
    run "pkill -9 node & echo 'success'"
  end
end
