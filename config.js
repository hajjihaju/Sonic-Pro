

module.exports = {
  TOKEN: "",
  language: "en",
  ownerID: ["921743618316836875", ""], 
  mongodbUri : "mongodb+srv://muhammed:muhsin121@cluster0.aod2oa4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  setupFilePath: './commands/setup.json',
  commandsDir: './commands',  
  embedColor: "#245c5c",
  activityName: "V.1.2", 
  activityType: "",  // Available activity types : LISTENING , PLAYING
  SupportServer: "https://discord.gg/QHzdUj2VqN",
  embedTimeout: 5, 
  errorLog: "https://discord.com/channels/1198721061706027048/1334547456884736000", 
 nodes: [
    {
      name: "Catfein ID",
      password: "catfein",
      host: "lava.catfein.com",
      port: 4000,
      secure: false
    },
    { 
      name: "saher",
      password: "saher.inzeworld.com",
      host: "lava.inzeworld.com",
      port: 3128,
      secure: false
    }
  ]
}
