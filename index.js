
// create by scratch3-extension generator https://github.com/KittenBot/scratch3-extension
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class serialExt{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('serialExt', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'serialExt',
      name: 'Serial Communication',
      color1: '#1367c9',
      color2: '#f8b405',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'connect',
          blockType: BlockType.COMMAND,
          arguments: {
            port: {
              type: ArgumentType.STRING
            }
          },
          text: 'connect [port]'
        },
        {
          opcode: 'send',
          blockType: BlockType.COMMAND,
          arguments: {
            message: {
              type: ArgumentType.STRING
            }
          },
          text: 'send [message]'
        },
        {
          opcode: 'onSerialAvailable',
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          text: 'when serial data is available'
        },
        {
          opcode: 'read',
          blockType: BlockType.REPORTER,
          text: 'read'
        },
        {
          opcode: 'readUntil',
          blockType: BlockType.REPORTER,
          arguments: {
            token: {
              type: ArgumentType.STRING
            }
          },
          text: 'read until [token]'
        },
        {
          opcode: 'readAll',
          blockType: BlockType.REPORTER,
          text: 'read all'
        },
        {
          opcode: 'isConnected',
          blockType: BlockType.BOOLEAN,
          text: 'is connected'
        }
      ]
    }
  }

connect (args, util){
  const port = args.port;

  return this.write(`M0 \n`);
}

send (args, util){
  const message = args.message;

  return this.write(`M0 \n`);
}

onSerialAvailable (args, util){

  return this.write(`M0 \n`);
}

read (args, util){

  return this.write(`M0 \n`);
}

readUntil (args, util){
  const token = args.token;

  return this.write(`M0 \n`);
}

readAll (args, util){

  return this.write(`M0 \n`);
}

isConnected (args, util){

  return this.write(`M0 \n`);
}

}

module.exports = serialExt;
