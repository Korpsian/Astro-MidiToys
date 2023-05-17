import { ToyManager } from "../miditoy/ToyManager";

const tManager = new ToyManager();

export function InitToy(channel, toy, ToyChanged) {
    toy = tManager.GetToy(channel);
    // toy.UnsubscribeFromToyChangedEvent(ToyChanged);
    if(toy != undefined) {
        toy.SubscribeToToyChangedEvent(ToyChanged);
        return toy;
    }
}

export function UnsubscribeEvent(targetFunction) {
    toy.UnsubscribeFromToyChangedEvent(targetFunction);
}

export function CreateToy(channel, type) {
    //If toyType changed, create toy, otherwise, just udpate
    switch(type) {
        case 0: tManager.CreateEmptyToy(channel);       break;
        case 1: tManager.CreateGraviBoard(channel);     break;
        case 2: tManager.CreatePolyDrum(channel);       break;
        // case 3: tManager.CreateSquareKeyboard(channel, numberOfKeys, startKey); break;
        default: tManager.CreateEmptyToy(channel);      break;
    }
    return tManager.GetToy(channel);
}

export function DetailsFillerCenter(summeryName, content) {
    return (
      <details class="marginAuto">
        <summary class="textAlignCenter marginAuto">
          {summeryName}
        </summary>
        <br />
        {content}
      </details>
    );
}

export function SliderInput() {
  return(
    <>
    
    </>
  );
}