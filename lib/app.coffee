_ = require("underscore")
connect = require('connect')
io = require('socket.io')

class App

  @appDir = __dirname

  include: (path)-> require "#{App.appDir}/#{path}"

  startHttpServer: ->
    @server = connect.createServer connect.logger(), connect.static(App.appDir + @config.staticDir)
    @server.listen(@config.port)

  startSocketServer: ->
    @socket = io.listen(@server)

  constructor: (@options={})->
    @config = @include("lib/config").create(this)
    @startHttpServer()
    @startSocketServer()

# #######################
@appClass = (appDir)->
  App.appDir = appDir
  App

