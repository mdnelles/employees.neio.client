function HandleMIDI(e) {
   var chan = 4;

   if (e instanceof Note) {
      // (I don't what kind of 'command' this is)

      if (e.pitch >= 60 && e.pitch <= 72) {
         e.channel = chan;
         e.send();
      } else {
         e.send();
      }
   } else {
      e.send();
   }
}
