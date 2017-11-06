import os, sys
import pkgutil
import unittest
import shutil
import fnmatch

path=os.path.join(os.getcwd(),"test.db")
os.environ["DATABASE_URL"] = "sqlite:///" + path

def collect_test_suite(pkgName,pattern):
    """
    hack: implementation of discover for python 2.6
    for python 2.7 and 3+ use test_loader.discover

    assumes that python files containing tests start with test_
      and classes start with Test,
      and of those classes, the methods start with test_
    """
    pkg = __import__(pkgName)
    suite = unittest.TestSuite()
    for importer, modname, ispkg in pkgutil.iter_modules(pkg.__path__):
        if modname.startswith("test_"):
            module = __import__(pkgName+'.'+modname, fromlist="dummy")
            for clsName,cls in vars(module).items():
                if clsName.startswith("Test") or clsName.endswith("TestCase") :
                    for testName in dir(cls):
                        if testName.startswith("test_"):
                          if fnmatch.fnmatch(testName,pattern):
                            suite.addTest(cls(testName))
                          else:
                            sys.stderr.write("skipping test %s.\n"%testName)
    return suite

def main():
    """run server tests"""
    test_loader = unittest.defaultTestLoader
    test_runner = unittest.TextTestRunner(verbosity=0)
    #ptn = self.test if self.test else "*"
    test_suite = collect_test_suite("server","*");
    return test_runner.run(test_suite)

if __name__ == '__main__':
    main()