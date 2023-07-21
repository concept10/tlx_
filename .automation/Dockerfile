FROM node:16-alpine3.14 as build

// Ensure ENV ARG 
ARG tlx_=latest

RUN apk add --no-cache python3 make g++ libusb-dev eudev-dev avahi-dev cairo-dev jpeg-dev pango-dev giflib-dev 

RUN npm install -g --unsafe-perm tlx_@latest

WORKDIR /tlx_


RUN apk add --no-cache bluez bluez-deprecated libusb avahi-dev bind-tools dmidecode tini curl tzdata cairo-dev jpeg-dev pango-dev giflib-dev \
    && setcap cap_net_raw+eip $(eval readlink -f `which node`) \
    && setcap cap_net_raw+eip $(eval readlink -f `which hcitool`) \
    && setcap cap_net_admin+eip $(eval readlink -f `which hciconfig`) \
    && ln -s /usr/local/lib/node_modules/tlx/bin/tlx_.js

ENTRYPOINT ["/tlx_"]
CMD ["--digResolver"]
HEALTHCHECK --start-period=15s CMD curl --fail http://localhost:1991/home/ || exit 1
