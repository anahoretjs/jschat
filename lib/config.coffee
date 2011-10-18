_ = require("underscore")

class Config

  _defaultOptions: ->
    port: 3000
    staticDir: "/client"

  _userConfig: -> @app.include("config/config")

  constructor: (@app)->
    _options = _.extend @_defaultOptions(), @_userConfig()
    _.extend @, _options

# #######################
@create = (app)-> new Config(app)
