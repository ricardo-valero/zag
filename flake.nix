{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };
  outputs = {nixpkgs, ...}: let
    systems = nixpkgs.lib.systems.flakeExposed;
    mkNodejs = pkgs: nodejs:
      pkgs.symlinkJoin {
        name = "nodejs-with-corepack";
        paths = [
          nodejs
          (pkgs.runCommand "corepack-enabled" {} ''
            mkdir -p $out/bin
            ${nodejs}/bin/corepack enable --install-directory $out/bin
          '')
        ];
      };
  in {
    devShells = nixpkgs.lib.genAttrs systems (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      nodejs = mkNodejs pkgs pkgs.nodejs-slim_22;
    in {
      default = pkgs.mkShell {
        packages = builtins.attrValues {inherit (pkgs) nixd nil alejandra;} ++ [nodejs];
      };
    });
  };
}
