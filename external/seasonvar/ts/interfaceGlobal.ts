export interface stbObj {
  SetVideoState(state: number);
  Play(url: string);
  InitPlayer(): void;
  SetVideoControl(mode: number);
  SetTopWin(position: number);
  SetVolume(number: number);
  GetPosTimeEx();
  GetMediaLenEx();
  Pause();
  Continue();
  GetVolume();
  SetPosTimeEx(time: any);
  SetSpeed(value: any);
  IsPlaying();
  Stop();
  ShowVirtualKeyboard()
  HideVirtualKeyboard()
  RDir(string:string);
}

export interface windowObj {
  location: any
}

export interface PlayOjb {
  playControlInterfaceInit();
  progresControllStart();
  continuePlayback();
  pause();
  switchPlayPause();
  showPlayInfo();
  exitPlay();
  volumePlus();
  volumeMinus();
  timeShiftRight();
  timeShiftLeft();
  OpenSettingMenu();
  playSettingMenuNextElem();
  playSettingMenuPrevElem();
  playSettingMenuSubmit();
  closeSettingMenu();
  progresControllInterval: number;
}
