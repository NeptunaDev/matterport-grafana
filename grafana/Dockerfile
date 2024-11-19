FROM grafana/grafana:latest

USER root

ENV TERM=linux
ENV GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-polystat-panel

RUN apk update && apk add vim

COPY defaults.ini /usr/share/grafana/conf/defaults.ini

USER grafana