# Octoapp
This is a generic application to be a target for monitoring tools. This branch adds support for Prometheus metrics with the [`prom-client`](https://github.com/siimon/prom-client) package. 


# Features
1. Dump a stack trace to `./logs/stacktraces.log`
2. Spike the CPU for N seconds
3. Increment/Decrement `some_gauge` metric. 

# Installation Requirements
* git
* node and npm

```
git clone https://github.com/xMTinkerer/octoapp.git
cd octoapp
npm install
```

# Run
Per the `package.json`, just fire up:
```
npm start
```

Then navigate your browser to `http://localhost:9988` and pick a button. 

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