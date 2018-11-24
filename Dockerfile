FROM node:alpine
MAINTAINER Sven Beisiegel <mailsvb@gmail.com>

# add nodejs project
RUN mkdir /ftpd
ADD lib /ftpd/lib
ADD ftp-server /ftpd/
ADD index.js /ftpd/
ADD package.json /ftpd/
RUN chmod +x /ftpd/ftp-server

# install nodejs project
WORKDIR "/ftpd"
RUN npm install .

# create data folder
RUN mkdir /data

# expose FTP port
EXPOSE 21

# expose path
VOLUME /data

# start server
CMD [ "./ftp-server", "/data", "--host 0.0.0.0", "--port 21" ]
