# /*-----------------------------------------------------------------------------*

# FILE
# .develop.zsh

# DESCRIPTION
# ZSH Script to run 'gatsby develop' process on project

# *-----------------------------------------------------------------------------*/

#!/bin/zsh
sudo clear
echo "\n\033[1;49;33mDEVELOP.ZSH:\033[1;32m a ZSH script to \033[49;33mBUILD\033[1;32m and \033[49;33mRUN\033[1;32m a \033[49;33mDEV\033[1;32melopment\033[0m \033[1;32mversion of this project."
echo "\n\033[1;35m1. Update dependencies:\033[0m\n"
ncu -u
echo "\n\033[1;35m2. Install:\033[0m\n"
npm install
echo "\n\033[1;35m3. Audit Vulnerabilities:\033[0m\n"
npm audit
echo "\n\033[1;35m4. Fix Vulnerabilities:\033[0m\n"
npm audit fix
echo "\n\033[1;35m5. Clean:\033[0m\n"
sudo gatsby clean
echo "\n\033[1;35m6. Prettier:\033[0m\n"
prettier --write "**/*.{js,jsx,json,yml}"
echo "\n\033[1;35m6. Develop:\033[0m\n"
sudo gatsby develop
