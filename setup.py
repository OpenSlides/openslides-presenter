from setuptools import find_packages, setup

package_name = 'openslides-clicker'
module_name = 'openslides_clicker'

__verbose_name__ = 'OpenSlides CLicker Plugin'
__description__ = 'This plugin provides a way to use presentation remotes with OpenSlides.'
__version__ = '1.0'

# module = __import__(module_name)

with open('README.rst') as readme:
    long_description = readme.read()

with open('requirements.txt') as requirements:
    install_requires = requirements.readlines()

setup(
    name=package_name,
    version=__version__,
    description=__verbose_name__,
    long_description=long_description,
    author='Authors of %s, see AUTHORS' % __verbose_name__,
    author_email='eriksteenman@gmail.com',
    url='http://github.com/lesteenman',
    keywords='OpenSlides',
    classifiers=[
        'Development Status :: 1 - Production/Unstable',
        'Environment :: Plugins',
        'Environment :: Web Environment',
        'Framework :: Django',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 2'],
    license='MIT',
    packages=find_packages(),
    include_package_data=True,
    install_requires=install_requires,
    entry_points={'openslides_plugins': '%s = %s' % (__verbose_name__, module_name)})
