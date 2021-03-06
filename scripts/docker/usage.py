#!/usr/bin/python3

RED = '\033[91m'
BLUE = '\033[94m'
END = '\033[0m'


def red(str):
    return RED + str + END


def blue(str):
    return BLUE + str + END


def usage(arguments):
    print('''
    Usage:
        python3 devenv.py <command> <arguments>
        devenv.py <command> <arguments>

    Commands:
        build                     Downloads and builds images.
        clean                     Removes all containers, networks {volumes}.
        dev                       Starts containers.
        kill                      Runs clean and {images}.
        lint                      Runs linter in backend or frontend.
        logs                      Attaches logs to terminal.
        restart                   Restarts containers.
        start                     Start containers in detached mode.
        status                    Shows all containers, images, networks and volumes.
        stop                      Stops all containers.
        test                      Runs the test runner in all services.'''
    .format(
        volumes=red('and volumes'),
        images=red('removes all images'),
    ))
