_ = require("underscore")
connect = require('connect')
io = require('socket.io')

class App

  include: (path)-> require "#{@appDir}/#{path}"

  startHttpServer: ->
    @server = connect.createServer connect.logger(), connect.static(@appDir + @config.staticDir)
    @server.listen @config.port

  startSocketServer: ->
    @socket = io.listen(@server)

  constructor: (dirname)->
    @appDir = dirname
    @config = @include("lib/config").create(this)
    @templater = @include("lib/templater").create(this)

  run: ->
    @startHttpServer()
    @startSocketServer()

# #######################
@appClass = -> App

