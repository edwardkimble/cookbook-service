//
// config.js
//
// Web service configuration parameters, separate
// from our cookbook-config file that contains 
// AWS-specific configuration information.
//

const config = {
    cookbook_config: "cookbook-config",
    cookbook_profile: "s3readwrite",
    service_port: 8081,
    page_size: 12
  };
  
  module.exports = config;