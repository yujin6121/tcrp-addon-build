# Docker file for Synology package building environment
FROM ubuntu:latest

# Install required packages
RUN apt-get update && \
    apt-get install -qy \
    python3 \
    python3-pip \
    git \
    cifs-utils \
    jq \
    rsync \
    tree \
    wget \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create necessary directories
RUN mkdir -p /toolkit /workspace

# Set working directory
WORKDIR /workspace

# Copy build scripts and stubs
COPY build* /
COPY stubs/ /stubs/

# Ensure build scripts are executable
RUN chmod +x /build*

# Set environment variables
ENV TOOLKIT=/toolkit
ENV WORKSPACE=/workspace

# Code file to execute when the docker container starts up
ENTRYPOINT ["/build"]
