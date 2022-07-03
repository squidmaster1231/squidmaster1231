import {world} from "mojang-minecraft";
import { ActionFormData, ModalFormData } from "mojang-minecraft-ui";

const Password = "Welcome21"; //set the password at here




//make bedrock flat
world.events.tick.subscribe(ev => {
  try {
  world.getDimension("overworld").runCommand('execute @a ~ ~ ~ fill ~40 -63 ~40 ~-40 -60 ~-40 deepslate 0 replace bedrock');
  } catch {}
})



//optifine for BE main system
world.events.beforeItemUse.subscribe(ev => {
    let {source, item} = ev;

    if (item.id == 'minecraft:stick') {  

   UI();

    }    
         function UI() {
        new ActionFormData()
        .title('optifinemenu')
        .body('setting of optifine')
        .button(`enter password`)
        .show(source).then((rs) => {
          if (rs.selection == 0) {

          let EP = new ModalFormData()
          EP.textField("if you want to edit\n the setting of optifine for BE\n you need to get the subscription\n and set the password.\nBut this setting is not so important\n\n Enter Password", "Password")
          EP.show(source).then(({formValues, isCanceled}) => {
            if (formValues[0] == Password) {
              new ActionFormData()
              .title("gamemode changer")
              .button("creative")
              .button("survival")
              .button("Adventure")
              .button("Spectator\nOnly some worlds")
              .button("Execute a command")
              .show(source).then((rs) => {
                if (rs.selection == 0) source.runCommand("gamemode 1 @s");
                if (rs.selection == 1) source.runCommand("gamemode 0 @s");
                if (rs.selection == 2) source.runCommand("gamemode 2 @s");
                if (rs.selection == 3) source.runCommand("gamemode 6 @s");
                if (rs.selection == 4) {
                  let command = new ModalFormData()
                  command.textField("§cDo not add /§f", "command")
                  .show(source).then(({formValues, isCanceled}) => {
                    if (isCanceled) return;
                    source.runCommand(`${formValues[0]}`);
                  })
                }
              })
            }
          })
            
        }
        })}
  })





//command

world.events.beforeChat.subscribe(eventData => {
  let {source} = eventData;
  let message = eventData.message; 
  if (message.startsWith("!")) {
    eventData.cancel = true; 
    eventData.sender.runCommand(`${message.substr(1)}`);
  }
});

