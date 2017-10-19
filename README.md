# Octoapp
This is a generic application to be a target for monitoring tools. 


# Features
1. Dump a stack trace to `./logs/dynatracer.log`
1. Dump a stack trace to `./logs/stacktraces.log`
2. Spike the CPU for 10 seconds
3. Throw a New Relic error
3. Set the `some_gauge` metric to 20 or 40

Shows on-call info for the groups defined in `./data/data.json`. 

# Installation Requirements
* git
* node and npm

```
git clone https://github.com/xMTinkerer/octoapp.git
cd octoapp
npm install
```

# Run
Per the `package.json`, just fire up with `npm`. Pass `USERNAME` and `PASSWORD` to set the login credentials and `XM_USERNAME`, `XM_PASSWORD`, and `XM_HOST` for pulling the on-call information:
```
XM_USERNAME=xm_user XM_PASSWORD=password XM_HOST=acme.xmatters.com USERNAME=user PASSWORD=password npm start
```

Then navigate your browser to `http://localhost:9988` and pick a button. 

# New Relic set up
Create a `newrelic.js` file with the following text. Substituting the `license_key` as needed:

```javascript
 
'use strict'
/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['octoapp'],
  /**
   * Your New Relic license key.
   */
  license_key: 'LICENSE KEY HERE',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
}

```

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



