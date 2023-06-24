with import <nixpkgs> { config.android_sdk.accept_license = true; };

let
  androidStudio = pkgs.android-studio;
in
mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.yarn
    androidStudio
    pkgs.openjdk11
    pkgs.android-tools
  ];
 allowUnfree = true;

  shellHook = ''
    export ANDROID_HOME=${androidStudio}/sdk
    export PATH=${nodejs}/bin:${yarn}/bin:${androidStudio}/tools:${androidStudio}/platform-tools:$PATH
  '';
}
