# Octoapp
This is a generic application to be a target for monitoring tools. 

Shows on-call info for the groups defined in `./data/data.json`. 

# Installation
**Requirements**
* git
* node and npm

```
git clone https://github.com/xMTinkerer/octoapp.git
cd octoapp
npm install
```

# Run
Per the `package.json`, just fire up with `npm`. Pass `USERNAME` and `PASSWORD` to set the login credentials and `XM_USERNAME`, `XM_PASSWORD`, and `XM_HOST` for pulling the on-call information. Store all environment variables in a file named ".env"

**.env**
```
XM_USERNAME=xm_user
XM_PASSWORD=password
XM_HOST=acme.xmatters.com
USERNAME=user
PASSWORD=password
```

Start it up with `npm start`. Then navigate your browser to `http://localhost:9988` and pick a button. 

# Prometheus tracking
Add this section to the `$PROMETHEUS_HOME/prometheus.yml` file:

```yml
  - job_name: 'octoapp'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 2s
    #scrape_timeout: 5s

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ['localhost:9988']
        labels: 
          group: 'octo'
```



