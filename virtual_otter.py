import datetime
import re

class Otter():

    def __init__(self, question):
        self.failed_request = "\nI'm sorry but I cannot understand the request"
        self.question = str(question).lower()

    def interpret(self):
        if "hey otter," in self.question:

            task = ""
            try:
                task = re.search("(date|times|plus|minus|time|multipl|div)", self.question).group(0)
            except:
                return self.failed_request

            if task == "date":
                return ("\nToday is " + str(datetime.datetime.now().day) + "/" + str(datetime.datetime.now().month) + "/" + str(datetime.datetime.now().year))
            elif task == "time":
                return ("\nIt is now " + str(datetime.datetime.now().hour) + ":" + str(datetime.datetime.now().minute))
            elif task in ["plus", "minus", "times", "multipl", "div"]:
                try:
                    x = int(re.findall("([0-9]+)", self.question)[0])
                    y = int(re.findall("([0-9]+)", self.question)[1])
                except:
                    return self.failed_request

                if task == "div":
                    return ("\nThe answer is " + str(x / y))
                elif task == "minus":
                    return ("\nThe answer is " + str(x - y))
                elif task == "times" or task == "multipl":
                    return ("\nThe answer is " + str(x * y))
                elif task == "plus":
                    return ("\nThe answer is " + str(x + y))

